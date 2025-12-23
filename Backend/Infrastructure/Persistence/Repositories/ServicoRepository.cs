using Backend.Domain.Entities;
using Backend.Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Persistence.Repositories
{
    public class ServicoRepository(AppDbContext context) : IServicoRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<Servico?> ConsultarPorIdAsync(int id)
        {
            return await _context.Servicos.FindAsync(id);
        }

        public async Task<IEnumerable<Servico>> ConsultarTodosAsync()
        {
            return await _context.Servicos.ToListAsync();
        }

        public async Task<Servico> CriarAsync(Servico servico)
        {
            _context.Servicos.Add(servico);
            await _context.SaveChangesAsync();
            return servico;
        }

        public async Task<bool> AtualizarAsync(Servico servico)
        {
            var existente = await _context.Servicos.FindAsync(servico.Id);
            if (existente == null)
                return false;

            _context.Entry(existente).CurrentValues.SetValues(servico);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}