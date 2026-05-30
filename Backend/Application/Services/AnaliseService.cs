using Backend.Application.DTOs.Analise;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using System.Globalization;

namespace Backend.Application.Services
{
    public class AnaliseService(
        IPagamentoRepository pagamentoRepository,
        IServicoRepository servicoRepository,
        IEntregaRepository entregaRepository
    ) : IAnaliseService
    {
        private const string CultureName = "pt-BR";
        private readonly IPagamentoRepository _pagamentoRepository = pagamentoRepository;
        private readonly IServicoRepository _servicoRepository = servicoRepository;
        private readonly IEntregaRepository _entregaRepository = entregaRepository;

        public async Task<AnaliseDto> GetAnaliseDataAsync(DateTime? startDate, DateTime? endDate)
        {
            var end = endDate.HasValue ? endDate.Value.Date.AddDays(1).AddTicks(-1) : DateTime.UtcNow;
            var start = startDate.HasValue ? startDate.Value.Date : end.AddYears(-1);

            var startUtc = DateTime.SpecifyKind(start, DateTimeKind.Utc);
            var endUtc = DateTime.SpecifyKind(end, DateTimeKind.Utc);

            var pagamentos = await _pagamentoRepository.ListarPorIntervaloAsync(startUtc, endUtc);
            var servicos = await _servicoRepository.ListarPorIntervaloAsync(startUtc, endUtc);
            var entregas = await _entregaRepository.ListarPorIntervaloAsync(startUtc, endUtc);

            var meses = new List<string>();
            var lucroMensal = new List<decimal>();
            var servicosAbertosMensal = new List<int>();

            var current = new DateTime(start.Year, start.Month, 1);
            var last = new DateTime(end.Year, end.Month, 1);

            var culture = new CultureInfo(CultureName);

            while (current <= last)
            {
                var monthLabel = culture.TextInfo.ToTitleCase(current.ToString("MMM", culture).Replace(".", ""));
                meses.Add(monthLabel);

                var monthStart = new DateTime(current.Year, current.Month, 1, 0, 0, 0, DateTimeKind.Utc);
                var monthEnd = monthStart.AddMonths(1);

                var profit = pagamentos
                    .Where(p => p.CreatedAt!.Value >= monthStart && p.CreatedAt!.Value < monthEnd)
                    .Sum(p => p.Valor);
                lucroMensal.Add(profit);

                var openCount = servicos
                    .Where(s => s.CreatedAt!.Value >= monthStart && s.CreatedAt!.Value < monthEnd && !s.IsEntregue)
                    .Count();
                servicosAbertosMensal.Add(openCount);

                current = current.AddMonths(1);
            }

            var totalLucro = pagamentos.Sum(p => p.Valor);
            var totalAbertos = servicos.Count(s => !s.IsEntregue);
            var totalEntregues = entregas.Count();

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
