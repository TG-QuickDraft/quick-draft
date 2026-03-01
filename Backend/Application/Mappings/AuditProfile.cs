using System.Text.Json;
using AutoMapper;
using Backend.Application.DTOs.Audit;
using Backend.Domain.Entities;

namespace Backend.Application.Mappings
{
    public class AuditProfile : Profile
    {
        private static readonly JsonSerializerOptions _jsonOptions = new();

        public AuditProfile()
        {
            CreateMap<AuditLog, AuditLogDTO>()
                .ForMember(dest => dest.Changes,
                    opt => opt.MapFrom(src => DeserializeChanges(src.Changes))
                );
        }

        private static JsonElement DeserializeChanges(string changes)
        {
            if (string.IsNullOrEmpty(changes))
                return default;

            return JsonSerializer.Deserialize<JsonElement>(changes, _jsonOptions);
        }
    }
}