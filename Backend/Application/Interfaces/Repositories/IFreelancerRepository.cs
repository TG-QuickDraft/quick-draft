using Backend.Domain.Entities;

namespace Backend.Application.Interfaces.Repositories
{
    public interface IFreelancerRepository
    {
        Task<IEnumerable<Freelancer>> ConsultarTodosAsync();

        Task<Freelancer?> ConsultarPorIdAsync(int id);

        Task<Freelancer> CriarAsync(Freelancer freelancer);

        Task<bool> AtualizarAsync(Freelancer freelancer);

        Task<bool> DeletarAsync(int id);
    }
}