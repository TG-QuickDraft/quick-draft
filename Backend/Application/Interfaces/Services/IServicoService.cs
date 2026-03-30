using Backend.Application.DTOs.Servico;
using Backend.Application.Pagination;

namespace Backend.Application.Interfaces.Services
{
    public interface IServicoService
    {
        public Task<PagedResult<ServicoDTO>> ConsultarTodosAsync(
            FiltroServicoDTO filtro,
            int pagina,
            int tamanhoPagina
        );

        public Task<ServicoDTO?> ConsultarPorIdAsync(int id);

        public Task<ServicoDTO> CriarAsync(CriarServicoDTO servico, int usuarioId);

        public Task<bool> AtualizarAsync(AtualizarServicoDTO dto, int clienteId);

        public Task<PagedResult<ServicoDTO>> ConsultarPorClienteAsync(
            int clienteId,
            int pagina,
            int tamanhoPagina
        );

        public Task<bool> AceitarPropostaAsync(int servicoId, int propostaId, int clienteId);

    }
}
