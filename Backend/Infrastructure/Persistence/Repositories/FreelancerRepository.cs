using Microsoft.EntityFrameworkCore;

using Backend.Domain.Entities;
using Backend.Application.Interfaces.Repositories;
namespace Backend.Infrastructure.Persistence.Repositories
{
    public class FreelancerRepository(AppDbContext context) : IFreelancerRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<IEnumerable<Freelancer>> ConsultarTodosAsync()
        {
            return await _context.Freelancers
                .Include(f => f.Usuario)
                .ToListAsync();
        }

        public async Task<IEnumerable<Freelancer>> ConsultarPorNomeAsync(string nome)
        {
            return await _context.Freelancers
                .Include(f => f.Usuario)
                .Where(f => f.Usuario != null && EF.Functions.ILike(f.Usuario.Nome, $"%{nome}%"))
                .ToListAsync();
        }

        public async Task<Freelancer?> ConsultarPorIdAsync(int id)
        {
            return await _context.Freelancers
                .Include(f => f.Usuario)
                .FirstOrDefaultAsync(f => f.Id == id);
        }

        public async Task<Freelancer> CriarAsync(Freelancer freelancer)
        {
            _context.Freelancers.Add(freelancer);
            await _context.SaveChangesAsync();
            return freelancer;
        }

        public async Task<bool> AtualizarAsync(Freelancer freelancer)
        {
            var existente = await ConsultarPorIdAsync(freelancer.Id);
            if (existente == null)
                return false;

            _context.Entry(existente).CurrentValues.SetValues(freelancer);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}