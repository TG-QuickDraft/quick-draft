using Backend.Application.DTOs.ProjetoFreelancer;
using Backend.Application.DTOs.Upload;

namespace Backend.Application.Interfaces.Services
{
    public interface IProjetoFreelancerService
    {
        Task <ProjetoFreelancerDTO?> ConsultarPorIdAsync(int id);
        Task<IEnumerable<ProjetoFreelancerDTO>> ConsultarPorIdFreelancerAsync(int freelancerId);
        Task <ProjetoFreelancerDTO> CriarAsync(CriarProjetoFreelancerDTO projeto, int freelancerId);
        Task<bool> AtualizarImagemAsync(UploadImagemDTO imagem, int freelancerId, int projetoId);
    }
}