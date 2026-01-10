using Backend.Application.DTOs.Servico;

namespace Backend.Application.Interfaces.Services
{
    public interface IServicoService
    {
        public Task<IEnumerable<ServicoDTO>> ConsultarTodosAsync(FiltroServicoDTO filtro);

        public Task<ServicoDTO?> ConsultarPorIdAsync(int id);
        
        public Task<ServicoDTO> CriarAsync(CriarServicoDTO servico, int usuarioId);

        public Task<bool> AtualizarAsync(ServicoDTO servico);
    }
}