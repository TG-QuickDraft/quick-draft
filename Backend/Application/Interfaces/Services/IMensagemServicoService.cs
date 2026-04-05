using Backend.Application.DTOs.Mensagem;
using Backend.Domain.Entities;

namespace Backend.Application.Interfaces.Services
{
    public interface IMensagemServicoService
    {
        Task<MensagemChatDTO> EnviarMensagemAsync(
            EnviarMensagemDTO dto,
            int usuarioLogadoId
        );

        Task<IEnumerable<MensagemChatDTO>> ObterHistoricoAsync(
            int servicoId,
            int usuarioLogadoId
        );
    }
}