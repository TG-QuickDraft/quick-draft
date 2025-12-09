using AutoMapper;
using Backend.Application.DTOs;
using Backend.Domain.Entities;

namespace Backend.Application.Mappings
{
    public class FreelancerProfile : Profile
    {
        public FreelancerProfile()
        {
            CreateMap<Freelancer, FreelancerDTO>()
                .ForMember(dest => dest.Nome,
                       opt => opt.MapFrom(src => src.Usuario.Nome))
                .ForMember(dest => dest.FotoPerfilUrl,
                        opt => opt.MapFrom(src => src.Usuario.FotoPerfilUrl));

            CreateMap<FreelancerDTO, Freelancer>()
                .ForMember(dest => dest.Usuario,
                opt => opt.MapFrom(src => new Usuario
                {
                    Nome = src.Nome,
                    FotoPerfilUrl = src.FotoPerfilUrl
                }));
        }
    }
}