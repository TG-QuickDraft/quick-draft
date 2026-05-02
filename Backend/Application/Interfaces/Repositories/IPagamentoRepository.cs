using Backend.Domain.Entities;

namespace Backend.Application.Interfaces.Repositories
{
    public interface IPagamentoRepository
    {
        Task<Pagamento> CriarAsync(Pagamento pagamento);
        Task<bool> ExistePagamentoPorServico(int servicoId);
    }
}