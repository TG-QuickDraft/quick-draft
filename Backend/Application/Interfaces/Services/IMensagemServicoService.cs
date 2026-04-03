using Backend.Application.DTOs.Mensagem;

namespace Backend.Application.Interfaces.Services
{
    public interface IMensagemServicoService
    {
        Task EnviarMensagemAsync(
            EnviarMensagemDTO dto,
            int usuarioLogadoId
        );

        Task<IEnumerable<MensagemChatDTO>> ObterHistoricoAsync(
            int servicoId,
            int usuarioLogadoId
        );
    }
}