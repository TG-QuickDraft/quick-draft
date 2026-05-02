using Backend.Application.DTOs.Pagamento;

namespace Backend.Application.Interfaces.Services
{
    public interface IPagamentoService
    {
        Task<bool> RealizarPagamentoAsync(CriarPagamentoDTO dto, int clienteId);
    }
}