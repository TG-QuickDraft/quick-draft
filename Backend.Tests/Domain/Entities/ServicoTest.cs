using Backend.Domain.Entities;
using Backend.Domain.Exceptions;

namespace Backend.Tests.Domain.Entities
{
    public class ServicoTest
    {
        [Theory]
        [InlineData(1)]
        [InlineData(15)]
        [InlineData(1000)]
        public void DeveDefinirValorMinimo_ComSucesso(decimal valor)
        {
            Servico servico = new()
            {
                ValorMinimo = valor
            };
        }

        [Theory]
        [InlineData(-100)]
        [InlineData(-1)]
        [InlineData(0)]
        public void DeveLancarExcecao_SeValorMinimoNegativoOuZero(decimal valor)
        {
            Assert.Throws<RegraNegocioException>(() =>
            {
                Servico servico = new()
                {
                    ValorMinimo = valor
                };
            });
        }
    }
}
