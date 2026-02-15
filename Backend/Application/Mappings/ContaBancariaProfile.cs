using AutoMapper;
using Backend.Application.DTOs.ContaBancaria;
using Backend.Domain.Entities;

namespace Backend.Application.Mappings
{
    public class ContaBancariaProfile : Profile
    {
        public ContaBancariaProfile()
        {
            CreateMap<ContaBancaria, ContaBancariaDTO>();
            CreateMap<ContaBancariaDTO, ContaBancaria>();

            CreateMap<TipoConta, TipoContaDTO>();
            CreateMap<TipoContaDTO, TipoConta>();
        }
    }
}