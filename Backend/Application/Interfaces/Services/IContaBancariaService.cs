using Backend.Application.DTOs.ContaBancaria;

namespace Backend.Application.Interfaces.Services
{
    public interface IContaBancariaService
    {
        public Task<ContaBancariaDTO> ConsultarPorIdFreelancerAsync(int freelancerId);

        public Task<ContaBancariaDTO?> ConsultarPorIdAsync(int id);
        
        public Task<ContaBancariaDTO> CriarAsync(CriarContaBancariaDTO dto, int freelancerId);
    }
}