using AutoMapper;
using Backend.Application.DTOs.CartaoCredito;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Domain.Entities;

namespace Backend.Application.Services
{
    public class CartaoCreditoService(
        ICartaoCreditoRepository repository,
        IMapper mapper
    ) : ICartaoCreditoService
    {   
        private readonly ICartaoCreditoRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        public async Task<CartaoCreditoDTO> ConsultarPorIdClienteAsync(int clienteId)
        {
            return _mapper.Map<CartaoCreditoDTO>(
                await _repository.ConsultarPorIdClienteAsync(clienteId)
            );
        }

        public async Task<IEnumerable<BandeiraCartaoCreditoDTO>> ConsultarBandeirasAsync()
        {
            return _mapper.Map<IEnumerable<BandeiraCartaoCreditoDTO>>(
                await _repository.ConsultarBandeirasAsync()
            );
        }

        public async Task<CartaoCreditoDTO> CriarAsync(CriarCartaoCreditoDTO dto, int clienteId)
        {
            CartaoCredito cartaoToAdd = new()
            {
                Id = clienteId,
                NomeImpresso = dto.NomeImpresso,
                CodigoSeguranca = dto.CodigoSeguranca,
                BandeiraId = dto.BandeiraId,
            };

            return _mapper.Map<CartaoCreditoDTO>(
                await _repository.CriarAsync(cartaoToAdd)
            );
        }

        public async Task<CartaoCreditoDTO> AtualizarAsync(CartaoCreditoDTO dto, int clienteId)
        {
            CartaoCredito cartaoToUpdate = _mapper.Map<CartaoCredito>(dto);
            cartaoToUpdate.Id = clienteId;

            return _mapper.Map<CartaoCreditoDTO>(
                await _repository.AtualizarAsync(cartaoToUpdate)
            );
        }
    }
}