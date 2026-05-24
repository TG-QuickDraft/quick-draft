using Backend.Application.DTOs.Analise;
using Backend.Application.Interfaces.Services;
using Backend.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace Backend.Application.Services
{
    public class AnaliseService(AppDbContext context) : IAnaliseService
    {
        private readonly AppDbContext _context = context;

        public async Task<AnaliseDto> GetAnaliseDataAsync(DateTime? startDate, DateTime? endDate)
        {
            var end = endDate.HasValue ? endDate.Value.Date.AddDays(1).AddTicks(-1) : DateTime.UtcNow;
            var start = startDate.HasValue ? startDate.Value.Date : end.AddYears(-1);

            // Ensure UTC for Npgsql and PostgreSQL
            var startUtc = DateTime.SpecifyKind(start, DateTimeKind.Utc);
            var endUtc = DateTime.SpecifyKind(end, DateTimeKind.Utc);

            // Fetch data from database, strictly filtered by date range
            var pagamentos = await _context.Pagamentos
                .Where(p => p.CreatedAt.HasValue && p.CreatedAt.Value >= startUtc && p.CreatedAt.Value <= endUtc)
                .ToListAsync();

            var servicos = await _context.Servicos
                .Where(s => s.CreatedAt.HasValue && s.CreatedAt.Value >= startUtc && s.CreatedAt.Value <= endUtc)
                .ToListAsync();

            var entregas = await _context.Entregas
                .Where(e => e.CreatedAt.HasValue && e.CreatedAt.Value >= startUtc && e.CreatedAt.Value <= endUtc)
                .ToListAsync();

            var meses = new List<string>();
            var lucroMensal = new List<decimal>();
            var servicosAbertosMensal = new List<int>();

            var current = new DateTime(start.Year, start.Month, 1);
            var last = new DateTime(end.Year, end.Month, 1);

            var culture = new CultureInfo("pt-BR");

            while (current <= last)
            {
                var monthLabel = culture.TextInfo.ToTitleCase(current.ToString("MMM", culture).Replace(".", ""));
                meses.Add(monthLabel);

                var monthStart = new DateTime(current.Year, current.Month, 1, 0, 0, 0, DateTimeKind.Utc);
                var monthEnd = monthStart.AddMonths(1);

                var profit = pagamentos
                    .Where(p => p.CreatedAt.Value >= monthStart && p.CreatedAt.Value < monthEnd)
                    .Sum(p => p.Valor);
                lucroMensal.Add(profit);

                var openCount = servicos
                    .Where(s => s.CreatedAt.Value >= monthStart && s.CreatedAt.Value < monthEnd && !s.IsEntregue)
                    .Count();
                servicosAbertosMensal.Add(openCount);

                current = current.AddMonths(1);
            }

            var totalLucro = pagamentos.Sum(p => p.Valor);
            var totalAbertos = servicos.Count(s => !s.IsEntregue);
            var totalEntregues = entregas.Count;

            return new AnaliseDto
            {
                Meses = meses,
                LucroMensal = lucroMensal,
                ServicosAbertosMensal = servicosAbertosMensal,
                LucroTotal = totalLucro,
                TotalServicosAbertos = totalAbertos,
                TotalServicosEntregues = totalEntregues,
                ServicosEntreguesChart = new ServicosEntreguesDto
                {
                    Entregues = totalEntregues,
                    Pendentes = totalAbertos
                }
            };
        }
    }
}
