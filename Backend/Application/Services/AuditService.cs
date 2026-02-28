using AutoMapper;
using Backend.Application.DTOs.Audit;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;

namespace Backend.Application.Services
{
    public class AuditService(
        IAuditRepository repository,
        IMapper mapper
    ) : IAuditService 
    {
        private readonly IAuditRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<AuditLogDTO>> ConsultarAsync()
        {
            return _mapper.Map<IEnumerable<AuditLogDTO>>(
                await _repository.ConsultarAsync()
            );
        }
    }        
}