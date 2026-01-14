using Backend.Application.DTOs.Cliente;

namespace Backend.Application.Interfaces.Services
{
    public interface IClienteService
    {
        public Task<IEnumerable<ClienteDTO>> ConsultarTodosAsync();

        public Task<ClienteDTO?> ConsultarPorIdAsync(int id);
        
        public Task<ClienteDTO> CriarAsync(int usuarioId);

        public Task<bool> AtualizarAsync(ClienteDTO cliente);
    }
}