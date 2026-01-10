using Backend.Application.DTOs;
using Backend.Application.DTOs.Upload;
using Backend.Application.DTOs.Usuario;
using Backend.Domain.Enums;

namespace Backend.Application.Interfaces.Services
{
    public interface IUsuarioService
    {
        public Task<UsuarioDTO?> ConsultarPorIdAsync(int id);
        public Task<TipoUsuario> ObterTipoUsuario(int id);
        
        public Task<UsuarioDTO> CriarAsync(CriarUsuarioDTO usuario);

        public Task<bool> AtualizarAsync(UsuarioDTO usuario);

        public Task<bool> DeletarAsync(int id);

        public Task<bool> AtualizarFotoAsync(UploadImagemDTO dto, int usuarioId);
    }
}