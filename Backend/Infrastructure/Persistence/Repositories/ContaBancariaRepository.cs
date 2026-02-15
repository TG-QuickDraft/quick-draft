using Backend.Application.Interfaces.Repositories;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Persistence.Repositories
{
    public class ContaBancariaRepository(AppDbContext context) : IContaBancariaRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<ContaBancaria?> ConsultarPorIdFreelancerAsync(int freelancerId)
        {
            return await _context.ContasBancarias
                .Where(c => c.FreelancerId == freelancerId)
                .Include(c => c.TipoConta)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<TipoConta>> ConsultarTiposContaAsync()
        {
            return await _context.TiposContas.
                ToListAsync();
        }

        public async Task<ContaBancaria> CriarAsync(ContaBancaria conta)
        {
            _context.ContasBancarias.Add(conta);
            await _context.SaveChangesAsync();
            return conta;
        }

        public async Task<ContaBancaria> AtualizarAsync(ContaBancaria conta)
        {
            ContaBancaria? contaSalva =
                await ConsultarPorIdFreelancerAsync(conta.FreelancerId)
                    ?? throw new Exception("Conta não encontrada!");

            contaSalva.CpfTitular = conta.CpfTitular;
            contaSalva.NomeTitular = conta.NomeTitular;
            contaSalva.Banco = conta.Banco;
            contaSalva.Agencia = conta.Agencia;
            contaSalva.NumeroConta = conta.NumeroConta;
            contaSalva.TipoContaId = conta.TipoContaId;

            await _context.SaveChangesAsync();

            return contaSalva;
        }
    }
}