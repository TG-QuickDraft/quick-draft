using Backend.DTO;
using Backend.Models;

namespace Backend.Repositories.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<IEnumerable<Usuario>> ConsultarTodosAsync();

        Task<Usuario?> ConsultarPorIdAsync(int id);

        Task<Usuario> CriarAsync(Usuario usuario);

        Task<bool> AtualizarAsync(Usuario usuario);

        Task<bool> DeletarAsync(int id);
    }
}