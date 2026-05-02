using Backend.Application.Interfaces.Repositories;
using Backend.Application.Pagination;
using Backend.Domain.Entities;
using Backend.Infrastructure.Persistence.Extensions;

namespace Backend.Infrastructure.Persistence.Repositories
{
    public class AuditRepository(AppDbContext context) : IAuditRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<PagedResult<AuditLog>> ConsultarAsync(
            int pagina,
            int tamanhoPagina
        )
        {
            return await _context.AuditLogs
                .OrderByDescending(x => x.DateTime)
                .ToPagedResultAsync(pagina, tamanhoPagina);
        }
    }
}