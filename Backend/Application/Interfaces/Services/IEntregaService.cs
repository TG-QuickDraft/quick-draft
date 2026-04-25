using Backend.Application.DTOs.Entrega;

namespace Backend.Application.Interfaces.Services
{
    public interface IEntregaService
    {
        public Task<EntregaDTO?> ConsultarPorIdServicoAsync(int servicoId, int usuarioId);
        public Task<EntregaDTO> RealizarEntregaAsync(RealizarEntregaDTO dto, int freelancerId);
    }
}