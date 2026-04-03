using Backend.Domain.Entities;

namespace Backend.Application.Interfaces.Repositories
{
    public interface IPropostaRepository
    {
        Task<Proposta?> ConsultarPorIdAsync(int id);
        Task<IEnumerable<Proposta>> ConsultarPorIdServicoAsync(int id);
        Task<IEnumerable<Proposta>> ConsultarPorIdFreelancerAsync(int freelancerId);
        Task<Proposta> CriarAsync(Proposta proposta);
        Task<bool> ExistePorServicoEFreelancerAsync(int servicoId, int freelancerId);
    }
}