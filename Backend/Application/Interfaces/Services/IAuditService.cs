using Backend.Application.DTOs.Audit;
using Backend.Application.Pagination;

namespace Backend.Application.Interfaces.Services
{
    public interface IAuditService
    {
        public Task<PagedResult<AuditLogDTO>> ConsultarAsync(int pagina, int tamanhoPagina);
    }        
}