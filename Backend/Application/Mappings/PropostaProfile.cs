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
                    opt => opt.MapFrom(src => src.ProjetosDestacados))
                .ForMember(dest => dest.NomeServico,
                    opt => opt.MapFrom(src => src.Servico != null ? src.Servico.Nome ?? string.Empty : string.Empty));

            CreateMap<CriarPropostaDTO, Proposta>()
                .ForMember(dest => dest.ProjetosDestacados,
                    opt => opt.MapFrom(src => src.ProjetosDestacados));
        }
    }
}