using Backend.Domain.Entities;

namespace Backend.Application.Interfaces.Repositories
{
    public interface ICartaoCreditoRepository
    {
        Task<CartaoCredito?> ConsultarPorIdClienteAsync(int clienteId);
        Task<IEnumerable<BandeiraCartaoCredito>> ConsultarBandeirasAsync();
        Task<CartaoCredito> CriarAsync(CartaoCredito cartao);
        Task<CartaoCredito> AtualizarAsync(CartaoCredito cartao);
    }
}