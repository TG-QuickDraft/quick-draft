using AutoMapper;
using Backend.Application.DTOs.Avaliacao;
using Backend.Domain.Entities;

namespace Backend.Application.Mappings
{
    public class AvaliacaoProfile : Profile
    {
        public AvaliacaoProfile()
        {
            CreateMap<CriarAvaliacaoDTO, Avaliacao>();
            CreateMap<Avaliacao, AvaliacaoDTO>();
        }
    }
}
