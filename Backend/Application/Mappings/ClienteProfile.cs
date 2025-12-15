using AutoMapper;
using Backend.Application.DTOs;
using Backend.Domain.Entities;

namespace Backend.Application.Mappings
{
    public class ClienteProfile : Profile
    {
        public ClienteProfile()
        {
            CreateMap<Cliente, ClienteDTO>()
                .ForMember(dest => dest.Nome,
                       opt => opt.MapFrom(src => src.Usuario.Nome))
                .ForMember(dest => dest.FotoPerfilUrl,
                        opt => opt.MapFrom(src => src.Usuario.FotoPerfilUrl));

            CreateMap<ClienteDTO, Cliente>()
                .ForMember(dest => dest.Usuario,
                opt => opt.MapFrom(src => new Usuario
                {
                    Nome = src.Nome,
                    FotoPerfilUrl = src.FotoPerfilUrl
                }));
        }
    }
}