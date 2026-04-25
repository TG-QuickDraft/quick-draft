using AutoMapper;
using Backend.Domain.Entities;
using Backend.Application.DTOs.Entrega;

namespace Backend.Application.Mappings
{
    public class EntregaProfile : Profile
    {
        public EntregaProfile()
        {
            CreateMap<Entrega, EntregaDTO>();
        }
    }
}
