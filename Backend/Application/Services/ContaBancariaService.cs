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

        public async Task<ContaBancariaDTO> ConsultarPorIdFreelancerAsync(int freelancerId)
        {
            var conta = await _repository.ConsultarPorIdFreelancerAsync(freelancerId);

            return _mapper.Map<ContaBancariaDTO>(conta);
        }

        public async Task<IEnumerable<TipoContaDTO>> ConsultarTiposConta()
        {
            return _mapper.Map<IEnumerable<TipoContaDTO>>(
                await _repository.ConsultarTiposContaAsync()
            );
        }

        public async Task<ContaBancariaDTO> CriarAsync(CriarContaBancariaDTO dto, int freelancerId)
        {          
            ContaBancaria contaACriar = new()
            {
                CpfTitular = dto.CpfTitular,
                NomeTitular = dto.NomeTitular,
                Banco = dto.Banco,
                Agencia = dto.Agencia,
                NumeroConta = dto.NumeroConta,
                TipoContaId = dto.TipoContaId,
                FreelancerId = freelancerId,
            };

            return _mapper.Map<ContaBancariaDTO>(
                await _repository.CriarAsync(contaACriar)
            );
        }

        public async Task<ContaBancariaDTO> AtualizarAsync(ContaBancariaDTO dto, int freelancerId)
        {
            ContaBancaria contaToUpdate = _mapper.Map<ContaBancaria>(dto);
            contaToUpdate.FreelancerId = freelancerId;

            return _mapper.Map<ContaBancariaDTO>(
                await _repository.AtualizarAsync(contaToUpdate)
            );
        }

    }
}