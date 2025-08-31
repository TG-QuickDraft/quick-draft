using Microsoft.EntityFrameworkCore;

using backend.Models;
namespace backend.Repositories
{
    public class FreelancerRepository(AppDbContext context) : IFreelancerRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<IEnumerable<Freelancer>> ConsultarTodosAsync()
        {
            return await _context.Freelancers.ToListAsync();
        }

        public async Task<Freelancer?> ConsultarPorIdAsync(int id)
        {
            return await _context.Freelancers.FindAsync(id);
        }

        public async Task<Freelancer> CriarAsync(Freelancer freelancer)
        {
            _context.Freelancers.Add(freelancer);
            await _context.SaveChangesAsync();
            return freelancer;
        }

        public async Task<bool> AtualizarAsync(Freelancer freelancer)
        {
            var existente = await _context.Freelancers.FindAsync(freelancer.Id);
            if (existente == null)
                return false;

            _context.Entry(existente).CurrentValues.SetValues(freelancer);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeletarAsync(int id)
        {
            var freelancer = await _context.Freelancers.FindAsync(id);
            if (freelancer == null)
                return false;

            _context.Freelancers.Remove(freelancer);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}