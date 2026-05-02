using AutoMapper;
using Backend.Application.DTOs.Avaliacao;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Domain.Entities;

namespace Backend.Application.Services
{
    public class AvaliacaoService(
        IAvaliacaoRepository repository,
        IMapper mapper,
        IServicoService servicoService
    ) : IAvaliacaoService
    {   
        private readonly IAvaliacaoRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        private readonly IServicoService _servicoService = servicoService;

        public async Task<AvaliacaoDTO> CriarAsync(CriarAvaliacaoDTO dto, int userId)
        {
            if (dto.NotaEstrelas < 1 || dto.NotaEstrelas > 5)
                throw new ArgumentException("A nota de estrelas deve ser entre 1 e 5.");

            var servico = await _servicoService.ConsultarPorIdAsync(dto.ServicoId)
                ?? throw new InvalidOperationException("Serviço não encontrado!");

            var proposta = await _servicoService.ConsultarPropostaAceitaIdAsync(dto.ServicoId)
                ?? throw new InvalidOperationException("Proposta não encontrada!");

            if (servico.ClienteId != userId && proposta.FreelancerId != userId)
            {
                throw new UnauthorizedAccessException("Você não pertence a este serviço!");
            }

            if (AvaliacaoJaExiste(dto.ServicoId, userId))
            {
                throw new InvalidOperationException("Você já avaliou este serviço!");
            }

            int alvoId = servico.ClienteId == userId ? proposta.FreelancerId : servico.ClienteId;

            Avaliacao avaliacao = new()
            {
                AlvoId = alvoId,
                AutorId = userId,
                Comentario = dto.Comentario,
                NotaEstrelas = dto.NotaEstrelas,
                ServicoId = dto.ServicoId
            };

            return _mapper.Map<AvaliacaoDTO>(
                await _repository.CriarAsync(avaliacao)
            );
        }

        public bool AvaliacaoJaExiste(int servicoId, int autorId)
        {
            return _repository.ConsultarPorServicoIdEAutorIdAsync(servicoId, autorId).Result != null;
        }
    }
}