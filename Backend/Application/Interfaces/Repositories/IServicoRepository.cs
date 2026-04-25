using Backend.Application.DTOs.Servico;
using Backend.Application.Pagination;
using Backend.Domain.Entities;

namespace Backend.Application.Interfaces.Repositories
{
    public interface IServicoRepository
    {
        Task<PagedResult<Servico>> ConsultarTodosAsync(
            FiltroServicoDTO filtro,
            int pagina,
            int tamanhoPagina
        );

        Task<Servico?> ConsultarPorIdAsync(int id);
        Task<Proposta?> ConsultarPropostaAceitaIdAsync(int servicoId);

        Task<Servico> CriarAsync(Servico servico);

        Task<bool> AtualizarAsync(Servico servico);

        Task<PagedResult<Servico>> ConsultarPorClienteAsync(
            int clienteId, int pagina, int tamanhoPagina
        );
        
        Task<bool> AtualizarIsEntregue(int servicoId, bool isEntregue);
    }
}
