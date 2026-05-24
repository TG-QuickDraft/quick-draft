namespace Backend.Application.DTOs.Analise
{
    public class AnaliseDto
    {
        public List<string> Meses { get; set; } = [];
        public List<decimal> LucroMensal { get; set; } = [];
        public List<int> ServicosAbertosMensal { get; set; } = [];
        public decimal LucroTotal { get; set; }
        public int TotalServicosAbertos { get; set; }
        public int TotalServicosEntregues { get; set; }
        public ServicosEntreguesDto ServicosEntreguesChart { get; set; } = new();
    }

    public class ServicosEntreguesDto
    {
        public int Entregues { get; set; }
        public int Pendentes { get; set; }
    }
}
