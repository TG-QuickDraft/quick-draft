using Backend.Application.DTOs.ContaBancaria;

namespace Backend.Application.Interfaces.Services
{
    public interface IContaBancariaService
    {
        public Task<ContaBancariaDTO> ConsultarPorIdFreelancerAsync(int freelancerId);

        public Task<IEnumerable<TipoContaDTO>> ConsultarTiposConta();
        
        public Task<ContaBancariaDTO> CriarAsync(CriarContaBancariaDTO dto, int freelancerId);
        
        public Task<ContaBancariaDTO> AtualizarAsync(ContaBancariaDTO dto, int freelancerId);
    }
}