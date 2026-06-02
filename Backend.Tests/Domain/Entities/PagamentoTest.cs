using Backend.Domain.Entities;
using Backend.Domain.Exceptions;

namespace Backend.Tests.Domain.Entities
{
    public class PagamentoTest
    {
        [Theory]
        [InlineData(1)]
        [InlineData(15)]
        [InlineData(1000)]
        public void DeveDefinirValor_ComSucesso(decimal valor)
        {
            Pagamento pagamento = new()
            {
                Valor = valor
            };
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-1)]
        [InlineData(-15)]
        public void DeveLancarExcecao_SeValorNegativoOuZero(decimal valor)
        {
            Assert.Throws<RegraNegocioException>(() =>
            {
                Pagamento pagamento = new()
                {
                    Valor = valor
                };
            });
        }
    }
}
