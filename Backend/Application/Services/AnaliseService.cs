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

            // Fetch data from database
            // We fetch all records for counts, but filter for monthly breakdown
            var allPagamentos = await _context.Pagamentos.ToListAsync();
            var allServicos = await _context.Servicos.ToListAsync();
            var allEntregas = await _context.Entregas.ToListAsync();

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

                var profit = allPagamentos
                    .Where(p => p.CreatedAt.HasValue && 
                                p.CreatedAt.Value >= new DateTime(current.Year, current.Month, 1, 0, 0, 0, DateTimeKind.Utc) && 
                                p.CreatedAt.Value < new DateTime(current.Year, current.Month, 1, 0, 0, 0, DateTimeKind.Utc).AddMonths(1))
                    .Sum(p => p.Valor);
                lucroMensal.Add(profit);

                var openCount = allServicos
                    .Where(s => s.CreatedAt.HasValue && 
                                s.CreatedAt.Value >= new DateTime(current.Year, current.Month, 1, 0, 0, 0, DateTimeKind.Utc) && 
                                s.CreatedAt.Value < new DateTime(current.Year, current.Month, 1, 0, 0, 0, DateTimeKind.Utc).AddMonths(1) && 
                                !s.IsEntregue)
                    .Count();
                servicosAbertosMensal.Add(openCount);

                current = current.AddMonths(1);
            }

            // Cards logic:
            // Lucro Total: Sum of all payments within the range (or ALL if they have no date and we are in default view)
            var lucroTotal = allPagamentos
                .Where(p => !p.CreatedAt.HasValue || (p.CreatedAt.Value >= startUtc && p.CreatedAt.Value <= endUtc))
                .Sum(p => p.Valor);

            // Serviços Abertos: Current global state of non-delivered services
            var totalAbertos = allServicos.Count(s => !s.IsEntregue);

            // Serviços Entregues: Deliveries within the range (or ALL if no date)
            var totalEntregues = allEntregas
                .Where(e => !e.CreatedAt.HasValue || (e.CreatedAt.Value >= startUtc && e.CreatedAt.Value <= endUtc))
                .Count();

            return new AnaliseDto
            {
                Meses = meses,
                LucroMensal = lucroMensal,
                ServicosAbertosMensal = servicosAbertosMensal,
                LucroTotal = lucroTotal,
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
