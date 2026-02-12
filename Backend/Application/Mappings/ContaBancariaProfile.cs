using AutoMapper;
using Backend.Application.DTOs.ContaBancaria;
using Backend.Domain.Entities;

namespace Backend.Application.Mappings
{
    public class ContaBancariaProfile : Profile
    {
        public ContaBancariaProfile()
        {
            CreateMap<ContaBancaria, ContaBancariaDTO>()
                .ForMember(dest => dest.TipoConta,
                    opt => opt.MapFrom(src => src.TipoConta != null ? src.TipoConta.Nome : ""));
        }
    }
}