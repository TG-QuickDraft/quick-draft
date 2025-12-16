using Backend.Domain.Entities;

namespace Backend.Application.Interfaces.Repositories
{
    public interface IClienteRepository
    {
        Task<IEnumerable<Cliente>> ConsultarTodosAsync();

        Task<Cliente?> ConsultarPorIdAsync(int id);

        Task<Cliente> CriarAsync(Cliente cliente);

        Task<bool> AtualizarAsync(Cliente cliente);
    }
}