using AutoMapper;
using Backend.Application.DTOs.Servico;
using Backend.Domain.Entities;

namespace Backend.Application.Mappings
{
    public class ServicoProfile : Profile
    {
        public ServicoProfile()
        {
            CreateMap<Servico, ServicoDTO>();
            CreateMap<ServicoDTO, Servico>()
                .ForMember(d => d.ClienteId, o => o.MapFrom(s => s.ClienteId))
                .ForMember(d => d.Cliente, o => o.Ignore())
                .ForMember(d => d.Id, o => o.Ignore());   
        }
    }
}