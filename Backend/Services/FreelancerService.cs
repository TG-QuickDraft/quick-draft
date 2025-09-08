using Backend.Models;
using Backend.Repositories;

namespace Backend.Services
{
    public class FreelancerService(IFreelancerRepository repository) : IFreelancerService
    {
        private readonly IFreelancerRepository _repository = repository;

        public async Task<IEnumerable<Freelancer>> ConsultarTodosAsync()
        {
            return await _repository.ConsultarTodosAsync(); ;
        }

        public async Task<Freelancer?> ConsultarPorIdAsync(int id)
        {
            return await _repository.ConsultarPorIdAsync(id);
        }

        public async Task<Freelancer> CriarAsync(Freelancer freelancer)
        {
            return await _repository.CriarAsync(freelancer);
        }

        public async Task<bool> AtualizarAsync(Freelancer freelancer)
        {
            return await _repository.AtualizarAsync(freelancer);
        }

        public async Task<bool> DeletarAsync(int id)
        {
            return await _repository.DeletarAsync(id);
        }
    }
}