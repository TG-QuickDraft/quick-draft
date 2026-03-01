using AutoMapper;
using Backend.Application.DTOs.Audit;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Application.Pagination;
using Backend.Application.Pagination.Extensions;
using Backend.Domain.Entities;

namespace Backend.Application.Services
{
    public class AuditService(
        IAuditRepository repository,
        IMapper mapper
    ) : IAuditService 
    {
        private readonly IAuditRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        public async Task<PagedResult<AuditLogDTO>> ConsultarAsync(
            int pagina,
            int tamanhoPagina
        )
        {
            tamanhoPagina = tamanhoPagina < 1 ? 30 : tamanhoPagina;
            tamanhoPagina = tamanhoPagina > 100 ? 100 : tamanhoPagina;

            var result = await _repository.ConsultarAsync(pagina, tamanhoPagina);

            return result.Map<AuditLog, AuditLogDTO>(_mapper);
        }
    }        
}