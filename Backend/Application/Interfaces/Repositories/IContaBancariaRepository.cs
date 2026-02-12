using Backend.Domain.Entities;

namespace Backend.Application.Interfaces.Repositories
{
    public interface IContaBancariaRepository
    {
        Task<ContaBancaria?> ConsultarPorIdAsync(int id);
        Task<ContaBancaria?> ConsultarPorIdFreelancerAsync(int freelancerId);
        Task<TipoConta?> ConsultarTipoContaPorNomeAsync(string nome);
        Task<ContaBancaria> CriarAsync(ContaBancaria conta);
    }
}