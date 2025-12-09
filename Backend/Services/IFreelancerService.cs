using Backend.DTO;

namespace Backend.Services 
{
    public interface IFreelancerService
    {
        public Task<IEnumerable<FreelancerDTO>> ConsultarTodosAsync();

        public Task<FreelancerDTO?> ConsultarPorIdAsync(int id);
        
        public Task<FreelancerDTO> CriarAsync(FreelancerDTO freelancer);

        public Task<bool> AtualizarAsync(FreelancerDTO freelancer);
    }
}