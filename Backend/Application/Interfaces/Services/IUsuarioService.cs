using Backend.Application.DTOs;

namespace Backend.Application.Interfaces.Services
{
    public interface IUsuarioService
    {
        public Task<UsuarioDTO?> ConsultarPorIdAsync(int id);
        
        public Task<UsuarioDTO> CriarAsync(UsuarioDTO usuario);

        public Task<bool> AtualizarAsync(UsuarioDTO usuario);

        public Task<bool> DeletarAsync(int id);

        public Task<bool> AtualizarFotoAsync(PerfilUploadDTO dto);
    }
}