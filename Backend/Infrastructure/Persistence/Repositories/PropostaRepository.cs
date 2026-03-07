using Backend.Application.Interfaces.Repositories;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Persistence.Repositories
{
    public class PropostaRepository(AppDbContext context) : IPropostaRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<Proposta?> ConsultarPorIdAsync(int id)
        {
            return await _context.Propostas
                .Include(p => p.ProjetosDestacados)
                .ThenInclude(pd => pd.ProjetoFreelancer)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Proposta>> ConsultarPorIdFreelancerAsync(int freelancerId)
        {
            return await _context.Propostas
                .Include(p => p.ProjetosDestacados)
                .ThenInclude(pd => pd.ProjetoFreelancer)
                .Where(p => p.FreelancerId == freelancerId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Proposta>> ConsultarPorIdServicoAsync(int servicoId)
        {
            return await _context.Propostas
                .Include(p => p.ProjetosDestacados)
                .ThenInclude(pd => pd.ProjetoFreelancer)
                .Where(p => p.ServicoId == servicoId)
                .ToListAsync();
        }

        public async Task<Proposta> CriarAsync(Proposta proposta)
        {
            await _context.Propostas.AddAsync(proposta);
            await _context.SaveChangesAsync();

            return await ConsultarPorIdAsync(proposta.Id) ?? proposta;
        }
    }
}