using Backend.Application.Pagination;
using Backend.Domain.Entities;

namespace Backend.Application.Interfaces.Repositories
{
    public interface IAuditRepository
    {
        Task<PagedResult<AuditLog>> ConsultarAsync(int pagina, int tamanhoPagina);
    }
}