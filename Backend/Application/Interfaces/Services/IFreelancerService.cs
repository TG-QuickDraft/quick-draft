using Backend.Application.DTOs;

namespace Backend.Application.Interfaces.Services
{
    public interface IFreelancerService
    {
        public Task<IEnumerable<FreelancerDTO>> ConsultarTodosAsync();

        public Task<IEnumerable<FreelancerDTO>> ConsultarPorNomeAsync(string nome);

        public Task<FreelancerDTO?> ConsultarPorIdAsync(int id);
        
        public Task<FreelancerDTO> CriarAsync(int usuarioId);

        public Task<bool> AtualizarAsync(FreelancerDTO freelancer);
    }
}