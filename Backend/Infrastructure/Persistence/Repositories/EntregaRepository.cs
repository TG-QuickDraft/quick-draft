using Backend.Application.Interfaces.Repositories;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Persistence.Repositories
{
    public class EntregaRepository(AppDbContext context) : IEntregaRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<Entrega?> ConsultarPorIdServicoAsync(int servicoId)
        {
            return await _context.Entregas
                .Where(e => e.ServicoId == servicoId)
                .FirstOrDefaultAsync();
        }

        public async Task<Entrega> CriarAsync(Entrega entrega)
        {
            await _context.Entregas.AddAsync(entrega);
            await _context.SaveChangesAsync();
            return entrega;
        }

        public async Task<IEnumerable<Entrega>> ListarPorIntervaloAsync(DateTime start, DateTime end)
        {
            return await _context.Entregas
                .Where(e => e.CreatedAt.HasValue && e.CreatedAt.Value >= start && e.CreatedAt.Value <= end)
                .ToListAsync();
        }
    }
}