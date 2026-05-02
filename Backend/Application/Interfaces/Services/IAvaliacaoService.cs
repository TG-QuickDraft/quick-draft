using Backend.Application.DTOs.Avaliacao;

namespace Backend.Application.Interfaces.Services
{
    public interface IAvaliacaoService
    {
        public Task<AvaliacaoDTO> CriarAsync(CriarAvaliacaoDTO dto, int userId);
    }
}