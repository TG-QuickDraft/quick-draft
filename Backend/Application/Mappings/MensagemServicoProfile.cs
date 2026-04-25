using AutoMapper;
using Backend.Domain.Entities;
using Backend.Application.DTOs.Mensagem;

namespace Backend.Application.Mappings
{
    public class MensagemServicoProfile : Profile
    {
        public MensagemServicoProfile()
        {
            CreateMap<MensagemServico, MensagemChatDTO>()
                .ForMember(dest => dest.UsuarioId, opt => opt.MapFrom(src => src.RemetenteUsuarioId))
                .ForMember(dest => dest.Mensagem, opt => opt.MapFrom(src => src.Mensagem));
        }
    }
}