namespace Backend.Application.DTOs
{
    public class CriarUsuarioDTO
    {
        public required string Nome { get; set; }
        public required string Cpf { get; set; }
        public required string Email { get; set; }
        public required string Senha { get; set; }
        public required string ConfirmarSenha { get; set; }

    }
}