using Backend.Domain.Entities;

namespace Backend.Application.Interfaces.Repositories
{
    public interface IUsuarioRepository
    {
        Task<IEnumerable<Usuario>> ConsultarTodosAsync();
        
        Task<Usuario?> ConsultarPorEmailAsync(string email);

        Task<Usuario?> ConsultarPorIdAsync(int id);

        Task<Usuario> CriarAsync(Usuario usuario);

        Task<bool> AtualizarAsync(Usuario usuario);

        Task<bool> DeletarAsync(int id);
    }
}