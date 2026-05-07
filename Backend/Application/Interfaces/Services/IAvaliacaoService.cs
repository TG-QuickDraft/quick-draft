using Backend.Application.DTOs.Avaliacao;

namespace Backend.Application.Interfaces.Services
{
    public interface IAvaliacaoService
    {
        public Task<AvaliacaoDTO> CriarAsync(CriarAvaliacaoDTO dto, int userId);
        public Task<bool> AvaliacaoJaExisteAsync(int servicoId, int autorId);
        public Task<AvaliacaoPerfilDTO> ConsultarAvaliacaoPerfilAsync(int usuarioId);
    }
}