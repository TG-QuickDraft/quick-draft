namespace Backend.Application.DTOs.Mensagem
{
    public class MensagemChatDTO
    {
        public int UsuarioId { get; set; }
        public string Mensagem { get; set; } = string.Empty;
        public DateTime Data { get; set; }
    }
}