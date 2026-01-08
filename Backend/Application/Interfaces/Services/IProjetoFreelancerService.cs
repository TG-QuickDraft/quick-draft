using Backend.Application.DTOs.ProjetoFreelancer;

namespace Backend.Application.Interfaces.Services
{
    public interface IProjetoFreelancerService
    {
        Task <ProjetoFreelancerDTO?> ConsultarPorIdAsync(int id);
        Task<IEnumerable<ProjetoFreelancerDTO>> ConsultarPorIdFreelancerAsync(int freelancerId);
        Task <ProjetoFreelancerDTO> CriarAsync(CriarProjetoFreelancerDTO projeto, int freelancerId);
        Task<bool> AtualizarImagemAsync(ImagemProjetoFreelancerUploadDTO imagem, int freelancerId, int projetoId);
    }
}