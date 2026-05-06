using Backend.Application.Interfaces.Repositories;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Persistence.Repositories
{
    public class PagamentoRepository(AppDbContext context) : IPagamentoRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<Pagamento> CriarAsync(Pagamento pagamento)
        {
            await _context.Pagamentos.AddAsync(pagamento);
            await _context.SaveChangesAsync();

            return pagamento;
        }

        public async Task<bool> ExistePagamentoPorServico(int servicoId)
        {
            return await _context.Pagamentos
                .AnyAsync(p => p.ServicoId == servicoId);
        }

        public async Task<IEnumerable<int>> ListarServicosPagosAsync(IEnumerable<int> servicoIds)
        {
            return await _context.Pagamentos
                .Where(p => servicoIds.Contains(p.ServicoId))
                .Select(p => p.ServicoId)
                .Distinct()
                .ToListAsync();
        }
    }
}