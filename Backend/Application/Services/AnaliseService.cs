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

            var pagamentos = await _context.Pagamentos
                .Where(p => p.CreatedAt >= start && p.CreatedAt <= end)
                .ToListAsync();

            var servicos = await _context.Servicos
                .Where(s => s.CreatedAt >= start && s.CreatedAt <= end)
                .ToListAsync();

            var entregas = await _context.Entregas
                .Where(e => e.CreatedAt >= start && e.CreatedAt <= end)
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

                var profit = pagamentos
                    .Where(p => p.CreatedAt?.Month == current.Month && p.CreatedAt?.Year == current.Year)
                    .Sum(p => p.Valor);
                lucroMensal.Add(profit);

                var openCount = servicos
                    .Where(s => s.CreatedAt?.Month == current.Month && s.CreatedAt?.Year == current.Year && !s.IsEntregue)
                    .Count();
                servicosAbertosMensal.Add(openCount);

                current = current.AddMonths(1);
            }

            var totalEntregues = entregas.Count;
            var totalAbertos = servicos.Count(s => !s.IsEntregue);

            return new AnaliseDto
            {
                Meses = meses,
                LucroMensal = lucroMensal,
                ServicosAbertosMensal = servicosAbertosMensal,
                LucroTotal = pagamentos.Sum(p => p.Valor),
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
