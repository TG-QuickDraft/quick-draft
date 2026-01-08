using Backend.Domain.Entities;

namespace Backend.Application.Interfaces.Repositories
{
    public interface IProjetoFreelancerRepository
    {
        Task<ProjetoFreelancer?> ConsultarPorIdAsync(int id);
        Task<IEnumerable<ProjetoFreelancer>> ConsultarPorIdFreelancerAsync(int freelancerId);
        Task<ProjetoFreelancer> CriarAsync(ProjetoFreelancer projeto);
        Task<bool> AtualizarAsync(ProjetoFreelancer projeto);
    }
}