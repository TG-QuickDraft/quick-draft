using Backend.Application.Interfaces.Repositories;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Persistence.Repositories
{
    public class ProjetoFreelancerRepository(AppDbContext context) : IProjetoFreelancerRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<ProjetoFreelancer?> ConsultarPorIdAsync(int id)
        {
            return await _context.ProjetosFreelancer.FindAsync(id);
        }

        public async Task<IEnumerable<ProjetoFreelancer>> ConsultarPorIdFreelancerAsync(
            int freelancerId
        )
        {
            return await _context.ProjetosFreelancer
                .Where(p => p.FreelancerId == freelancerId)
                .ToListAsync();
        }

        public async Task<ProjetoFreelancer> CriarAsync(ProjetoFreelancer projeto)
        {
            _context.ProjetosFreelancer.Add(projeto);
            await _context.SaveChangesAsync();
            return projeto;
        }

        public async Task<bool> AtualizarAsync(ProjetoFreelancer projeto)
        {
            var existente = await _context.ProjetosFreelancer.FindAsync(projeto.Id);
            if (existente == null)
                return false;

            _context.Entry(existente).CurrentValues.SetValues(projeto);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}