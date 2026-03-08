using Backend.Application.Pagination;
using Backend.Domain.Entities;

namespace Backend.Application.Interfaces.Repositories
{
    public interface IFreelancerRepository
    {
        Task<PagedResult<Freelancer>> ConsultarTodosAsync(
            string? nome,
            int pagina,
            int tamanhoPagina
        );

        Task<Freelancer?> ConsultarPorIdAsync(int id);

        Task<Freelancer> CriarAsync(Freelancer freelancer);

        Task<bool> AtualizarAsync(Freelancer freelancer);
    }
}
