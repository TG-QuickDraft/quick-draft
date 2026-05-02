using Backend.Domain.Entities;

namespace Backend.Application.Interfaces.Repositories
{
    public interface IAvaliacaoRepository
    {
        Task<Avaliacao?> CriarAsync(Avaliacao avaliacao);
        Task<Avaliacao?> ConsultarPorServicoIdEAutorIdAsync(int servicoId, int autorId);
    }
}