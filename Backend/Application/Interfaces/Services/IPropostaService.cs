using Backend.Application.DTOs.Proposta;

namespace Backend.Application.Interfaces.Services
{
    public interface IPropostaService
    {
        Task<PropostaDTO?> ConsultarPorIdAsync(int id);
        Task<IEnumerable<PropostaDTO>> ConsultarPorIdFreelancerAsync(int freelancerId);
        Task<IEnumerable<PropostaDTO>> ConsultarPorIdServicoAsync(int id);
        Task<PropostaDTO> CriarAsync(CriarPropostaDTO proposta, int freelancerId);
    }
}