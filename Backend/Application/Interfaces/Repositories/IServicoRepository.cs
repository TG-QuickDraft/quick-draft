using Backend.Domain.Entities;

namespace Backend.Application.Interfaces.Repositories
{
    public interface IServicoRepository
    {
        Task<IEnumerable<Servico>> ConsultarTodosAsync();

        Task<Servico?> ConsultarPorIdAsync(int id);

        Task<Servico> CriarAsync(Servico servico);

        Task<bool> AtualizarAsync(Servico servico);
    }
}