namespace Backend.Application.DTOs
{
    public class ServicoDTO
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public required string Descricao { get; set; }
        public ClienteDTO? Cliente { get; set; }
    }
}
