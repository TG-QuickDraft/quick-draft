using Backend.Domain.Entities;

namespace Backend.Application.Interfaces.Repositories
{
    public interface IEntregaRepository
    {
        public Task<Entrega?> ConsultarPorIdServicoAsync(int servicoId);
        public Task<Entrega> CriarAsync(Entrega entrega);
        public Task<IEnumerable<Entrega>> ListarPorIntervaloAsync(DateTime start, DateTime end);
    }
}