using System.ComponentModel.DataAnnotations;
using Backend.Domain.Enums;

namespace Backend.Application.DTOs.Usuario
{
    public class CriarUsuarioDTO
    {
        public required string Nome { get; set; }
        public required string Cpf { get; set; }
        public required string Email { get; set; }
        public required string Senha { get; set; }
        
        [Compare(nameof(Senha), ErrorMessage = "As senhas não conferem")]
        public required string ConfirmarSenha { get; set; }
        
        [EnumDataType(typeof(TipoUsuario))]
        public required TipoUsuario TipoUsuario { get; set; }
    }
}