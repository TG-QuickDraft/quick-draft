using AutoMapper;
using Backend.Application.DTOs.Proposta;
using Backend.Domain.Entities;

namespace Backend.Application.Mappings
{
    public class PropostaProfile : Profile
    {
        public PropostaProfile()
        {
            CreateMap<Proposta, PropostaDTO>()
                .ForMember(dest => dest.ProjetosDestacados,
                    opt => opt.MapFrom(src => src.ProjetosDestacados));

            CreateMap<CriarPropostaDTO, Proposta>()
                .ForMember(dest => dest.ProjetosDestacados,
                    opt => opt.MapFrom(src => src.ProjetosDestacados));
        }
    }
}