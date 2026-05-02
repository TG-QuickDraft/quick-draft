using Backend.Application.DTOs.Avaliacao;
using Backend.Domain.Entities;

namespace Backend.Tests.Common.Factories
{
    public static class AvaliacaoFactory
    {
        public static Avaliacao ObterAvaliacao()
        {
            return new Avaliacao
            {
                ServicoId = 1,
                AutorId = 10,
                AlvoId = 20,
                Comentario = "Ótimo serviço!",
                NotaEstrelas = 5
            };
        }

        public static AvaliacaoDTO ObterAvaliacaoDTO()
        {
            return new AvaliacaoDTO
            {
                ServicoId = 1,
                AutorId = 10,
                AlvoId = 20,
                Comentario = "Ótimo serviço!",
                NotaEstrelas = 5
            };
        }

        public static CriarAvaliacaoDTO ObterCriarAvaliacaoDTO()
        {
            return new CriarAvaliacaoDTO
            {
                ServicoId = 1,
                Comentario = "Ótimo serviço!",
                NotaEstrelas = 5
            };
        }

    }
}