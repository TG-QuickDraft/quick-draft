using AutoMapper;
using Backend.Application.DTOs.Cliente;
using Backend.Domain.Entities;

namespace Backend.Application.Mappings
{
    public class ClienteProfile : Profile
    {
        public ClienteProfile()
        {
            CreateMap<Cliente, ClienteDTO>()
                .ForMember(dest => dest.Nome,
                    opt => opt.MapFrom(src => src.Usuario != null ? src.Usuario.Nome : ""))
                .ForMember(dest => dest.FotoPerfilUrl,
                    opt => opt.MapFrom(src => src.Usuario != null ? src.Usuario.FotoPerfilUrl : ""));

            CreateMap<ClienteDTO, Cliente>()
                .ForMember(d => d.Usuario, o => o.Ignore());
        }
    }
}