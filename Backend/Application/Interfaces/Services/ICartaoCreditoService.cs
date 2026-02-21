using Backend.Application.DTOs.CartaoCredito;

namespace Backend.Application.Interfaces.Services
{
    public interface ICartaoCreditoService
    {
        public Task<CartaoCreditoDTO> ConsultarPorIdClienteAsync(int clienteId);

        public Task<IEnumerable<BandeiraCartaoCreditoDTO>> ConsultarBandeirasAsync();
        
        public Task<CartaoCreditoDTO> CriarAsync(CriarCartaoCreditoDTO dto, int clienteId);
        
        public Task<CartaoCreditoDTO> AtualizarAsync(CartaoCreditoDTO dto, int clienteId);
    }
}