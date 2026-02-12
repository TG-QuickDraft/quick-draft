namespace Backend.Application.DTOs.ContaBancaria {
    public class ContaBancariaDTO
    {
        public int Id { get; set; }
        public required string CpfTitular { get; set; }
        public required string NomeTitular { get; set; }
        public required string Banco { get; set; }
        public required string Agencia { get; set; }
        public required string NumeroConta { get; set; }
        public required string TipoConta { get; set; }
    }
}