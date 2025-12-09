using Microsoft.EntityFrameworkCore;

using Backend.Models;
using Backend.DTO;
namespace Backend.Repositories
{
    public class UsuarioRepository(AppDbContext context) : IUsuarioRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<IEnumerable<Usuario>> ConsultarTodosAsync()
        {
            return await _context.Usuarios.ToListAsync();
        }

        public async Task<Usuario?> ConsultarPorIdAsync(int id)
        {
            return await _context.Usuarios.FindAsync(id);
        }

        public async Task<Usuario> CriarAsync(Usuario Usuario)
        {
            _context.Usuarios.Add(Usuario);
            await _context.SaveChangesAsync();
            return Usuario;
        }

        public async Task<bool> AtualizarAsync(Usuario Usuario)
        {
            var existente = await _context.Usuarios.FindAsync(Usuario.Id);
            if (existente == null)
                return false;

            _context.Entry(existente).CurrentValues.SetValues(Usuario);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeletarAsync(int id)
        {
            var Usuario = await _context.Usuarios.FindAsync(id);
            if (Usuario == null)
                return false;

            _context.Usuarios.Remove(Usuario);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}