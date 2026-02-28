using Backend.Application.Interfaces.Repositories;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Persistence.Repositories
{
    public class AuditRepository(AppDbContext context) : IAuditRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<IEnumerable<AuditLog>> ConsultarAsync()
        {
            return await _context.AuditLogs
                .ToListAsync();
        }
    }
}