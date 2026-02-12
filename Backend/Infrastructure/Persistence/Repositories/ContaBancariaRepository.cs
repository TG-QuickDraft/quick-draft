using Backend.Application.Interfaces.Repositories;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Persistence.Repositories
{
    public class ContaBancariaRepository(AppDbContext context) : IContaBancariaRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<ContaBancaria?> ConsultarPorIdAsync(int id)
        {
            return await _context.ContasBancarias.FindAsync(id);
        }

        public async Task<ContaBancaria?> ConsultarPorIdFreelancerAsync(int freelancerId)
        {
            return await _context.ContasBancarias
                .Where(c => c.FreelancerId == freelancerId)
                .FirstOrDefaultAsync();
        }

        public Task<TipoConta?> ConsultarTipoContaPorNomeAsync(string nome)
        {
            throw new NotImplementedException();
        }

        public async Task<ContaBancaria> CriarAsync(ContaBancaria conta)
        {
            _context.ContasBancarias.Add(conta);
            await _context.SaveChangesAsync();
            return conta;
        }
    }
}