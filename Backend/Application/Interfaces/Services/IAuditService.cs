using Backend.Application.DTOs.Audit;

namespace Backend.Application.Interfaces.Services
{
    public interface IAuditService
    {
        public Task<IEnumerable<AuditLogDTO>> ConsultarAsync();
    }        
}