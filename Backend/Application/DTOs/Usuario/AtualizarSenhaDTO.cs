using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs.Usuario
{
    public class AtualizarSenhaDTO
    {
        public required string NovaSenha { get; set; }

        [Compare(nameof(NovaSenha), ErrorMessage = "As senhas não conferem")]
        public required string ConfirmarNovaSenha { get; set; }
    }
}