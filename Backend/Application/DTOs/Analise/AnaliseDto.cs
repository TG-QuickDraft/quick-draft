namespace Backend.Application.DTOs.Analise
{
    public class AnaliseDto
    {
        public List<string> Meses { get; set; } = [];
        public List<decimal> LucroMensal { get; set; } = [];
        public List<int> ServicosAbertosMensal { get; set; } = [];
        public List<int> UsuariosCadastradosMensal { get; set; } = [];
        public decimal LucroTotal { get; set; }
        public int TotalServicosAbertos { get; set; }
        public int TotalServicosEntregues { get; set; }
    }
}
