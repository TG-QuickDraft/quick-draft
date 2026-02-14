using Backend.Domain.Entities;

namespace Backend.Application.Interfaces.Repositories
{
    public interface IContaBancariaRepository
    {
        Task<ContaBancaria?> ConsultarPorIdFreelancerAsync(int freelancerId);
        Task<IEnumerable<TipoConta>> ConsultarTiposContaAsync();
        Task<ContaBancaria> CriarAsync(ContaBancaria conta);
        Task<ContaBancaria> AtualizarAsync(ContaBancaria conta);
    }
}