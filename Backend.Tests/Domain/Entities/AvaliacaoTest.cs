using Backend.Domain.Entities;
using Backend.Domain.Exceptions;

namespace Backend.Tests.Domain.Entities
{
    public class AvaliacaoTest
    {
        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(4)]
        [InlineData(5)]
        public void DeveDefinirValor_ComSucesso(decimal valor)
        {
            Avaliacao avaliacao = new()
            {
                NotaEstrelas = (int)valor
            };
        }

        [Theory]
        [InlineData(0)]
        [InlineData(6)]
        [InlineData(-1)]
        [InlineData(-15)]
        public void DeveLancarExcecao_SeNotaForaDoIntervalo(decimal valor)
        {
            Assert.Throws<RegraNegocioException>(() =>
            {
                Avaliacao avaliacao = new()
                {
                    NotaEstrelas = (int)valor
                };
            });
        }
    }
}
