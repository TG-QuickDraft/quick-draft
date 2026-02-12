using AutoMapper;
using Backend.Application.DTOs.ContaBancaria;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Domain.Entities;

namespace Backend.Application.Services
{
    public class ContaBancariaService(
        IContaBancariaRepository repository,
        IMapper mapper
    ) : IContaBancariaService
    {
        private readonly IContaBancariaRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        public async Task<ContaBancariaDTO?> ConsultarPorIdAsync(int id)
        {
            var conta = await _repository.ConsultarPorIdAsync(id);

            return _mapper.Map<ContaBancariaDTO>(conta);
        }

        public async Task<ContaBancariaDTO> ConsultarPorIdFreelancerAsync(int freelancerId)
        {
            var conta = await _repository.ConsultarPorIdAsync(freelancerId);

            return _mapper.Map<ContaBancariaDTO>(conta);
        }

        public async Task<ContaBancariaDTO> CriarAsync(CriarContaBancariaDTO dto, int freelancerId)
        {
            TipoConta tipoConta = 
                await _repository.ConsultarTipoContaPorNomeAsync(dto.TipoConta)
                    ?? throw new Exception("Tipo de conta inválido!");
            
            ContaBancaria contaACriar = new()
            {
                CpfTitular = dto.CpfTitular,
                NomeTitular = dto.NomeTitular,
                Banco = dto.Banco,
                Agencia = dto.Agencia,
                NumeroConta = dto.NumeroConta,
                TipoConta = tipoConta
            };

            return _mapper.Map<ContaBancariaDTO>(
                await _repository.CriarAsync(contaACriar)
            );
        }
    }
}