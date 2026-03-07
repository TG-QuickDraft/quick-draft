using System.ComponentModel.DataAnnotations;
using Backend.Domain.Enums;

namespace Backend.Application.DTOs.Usuario
{
    public class AtualizarDadosUsuarioDTO
    {
        public required string Nome { get; set; }
        public required string Cpf { get; set; }
        public required string Email { get; set; }
    }
}