using Backend.Domain.Entities;

namespace Backend.Application.Interfaces.Repositories
{
    public interface IAuditRepository
    {
        Task<IEnumerable<AuditLog>> ConsultarAsync();
    }
}