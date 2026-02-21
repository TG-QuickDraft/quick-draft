using AutoMapper;
using Backend.Application.DTOs.CartaoCredito;
using Backend.Domain.Entities;

namespace Backend.Application.Mappings
{
    public class CartaoCreditoProfile : Profile
    {
        public CartaoCreditoProfile()
        {
            CreateMap<CartaoCredito, CartaoCreditoDTO>();
            CreateMap<CartaoCreditoDTO, CartaoCredito>();

            CreateMap<BandeiraCartaoCredito, BandeiraCartaoCreditoDTO>();
            CreateMap<BandeiraCartaoCreditoDTO, BandeiraCartaoCredito>();
        }
    }
}