using Backend.Application.DTOs.Freelancer;
using Backend.Application.Pagination;

namespace Backend.Application.Interfaces.Services
{
    public interface IFreelancerService
    {
        public Task<PagedResult<FreelancerDTO>> ConsultarTodosAsync(
            string? nome,
            int pagina,
            int tamanhoPagina
        );

        public Task<FreelancerDTO?> ConsultarPorIdAsync(int id);

        public Task<FreelancerDTO> CriarAsync(int usuarioId);

        public Task<bool> AtualizarAsync(AtualizarFreelancerDTO dto, int freelancerId);
    }
}
