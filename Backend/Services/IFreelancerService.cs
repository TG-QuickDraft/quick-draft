using Backend.Models;

namespace Backend.Services 
{
    public interface IFreelancerService
    {
        public Task<IEnumerable<Freelancer>> ConsultarTodosAsync();

        public Task<Freelancer?> ConsultarPorIdAsync(int id);
        
        public Task<Freelancer> CriarAsync(Freelancer freelancer);

        public Task<bool> AtualizarAsync(Freelancer freelancer);

        public Task<bool> DeletarAsync(int id);
    }
}