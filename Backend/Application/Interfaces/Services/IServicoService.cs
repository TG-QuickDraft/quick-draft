using Backend.Application.DTOs;

namespace Backend.Application.Interfaces.Services
{
    public interface IServicoService
    {
        public Task<IEnumerable<ServicoDTO>> ConsultarTodosAsync();

        public Task<ServicoDTO?> ConsultarPorIdAsync(int id);
        
        public Task<ServicoDTO> CriarAsync(CriarServicoDTO servico, int usuarioId);

        public Task<bool> AtualizarAsync(ServicoDTO servico);
    }
}