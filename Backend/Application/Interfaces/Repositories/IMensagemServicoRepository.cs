using Backend.Domain.Entities;

namespace Backend.Application.Interfaces.Repositories
{
    public interface IMensagemServicoRepository
    {
        Task<MensagemServico> CriarAsync(MensagemServico mensagem);
        Task<IEnumerable<MensagemServico>> ConsultarPorServicoIdAsync(int servicoId);
    }
}