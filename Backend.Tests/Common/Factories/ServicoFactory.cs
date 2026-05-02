using Backend.Application.DTOs.Servico;

namespace Backend.Tests.Common.Factories
{
    public static class ServicoFactory
    {
        public static ServicoDTO ObterServicoDTO()
        {
            return new ServicoDTO
            {
                Id = 1,
                ClienteId = 20,
                Nome = "Teste",
                Descricao = "Teste",
                OrcamentoIsAberto = true,
                Prazo = DateTime.Now,
                ValorMinimo = 100
            };
        }
    }
}