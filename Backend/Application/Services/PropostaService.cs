using AutoMapper;
using Backend.Application.DTOs.Proposta;
using Backend.Application.Interfaces.Infrastructure;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Domain.Entities;

namespace Backend.Application.Services
{
    public class PropostaService(
        IPropostaRepository repository,
        
        IMapper mapper,
        IUrlBuilder urlBuilder,
        IServicoRepository servicoRepository
    ) : IPropostaService
    {
        private readonly IPropostaRepository _repository = repository;
        private readonly IMapper _mapper = mapper;
        private readonly IUrlBuilder _urlBuilder = urlBuilder;
        private readonly IServicoRepository _servicoRepository = servicoRepository;

        public async Task<PropostaDTO?> ConsultarPorIdAsync(int id)
        {
            var proposta = _mapper.Map<PropostaDTO>(
                await _repository.ConsultarPorIdAsync(id)
            );

            if (proposta == null)
                return null;

            MapearUrlsImagens(proposta);

            return _mapper.Map<PropostaDTO>(proposta);
        }

        public async Task<IEnumerable<PropostaDTO>> ConsultarPorIdFreelancerAsync(int freelancerId)
        {
            IEnumerable<PropostaDTO> list = _mapper.Map<IEnumerable<PropostaDTO>>(
                await _repository.ConsultarPorIdFreelancerAsync(freelancerId)
            );

            foreach (var proposta in list)
            {
                MapearUrlsImagens(proposta);
            }

            return list;
        }

        public async Task<IEnumerable<PropostaDTO>> ConsultarPorIdServicoAsync(
            int servicoId
        )
        {
            IEnumerable<PropostaDTO> list = _mapper.Map<IEnumerable<PropostaDTO>>(
                await _repository.ConsultarPorIdServicoAsync(servicoId)
            );

            foreach (var proposta in list)
            {
                MapearUrlsImagens(proposta);
            }

            return list;
        }

        public async Task<PropostaDTO> CriarAsync(
            CriarPropostaDTO dto,
            int freelancerId
        )
        {
            var servico = await _servicoRepository.ConsultarPorIdAsync(dto.ServicoId)
                ?? throw new InvalidOperationException("Serviço não encontrado");

            if (servico.PropostaAceitaId != null)
                throw new InvalidOperationException("Serviço já possui proposta aceita");

            if (dto.ProjetosDestacados.Count > 3)
                throw new InvalidOperationException("Não é permitido destacar mais de 3 projetos");
            
            var jaExiste = await _repository
                    .ExistePorServicoEFreelancerAsync(dto.ServicoId, freelancerId);

            if (jaExiste)
                throw new InvalidOperationException("Você já enviou uma proposta para este serviço");

            Proposta propostaToAdd = _mapper.Map<Proposta>(dto);
            propostaToAdd.FreelancerId = freelancerId;

            var propostaAdicionada = _mapper.Map<PropostaDTO>(
                await _repository.CriarAsync(propostaToAdd)
            );

            MapearUrlsImagens(propostaAdicionada);

            return _mapper.Map<PropostaDTO>(propostaAdicionada);
        }

        private void MapearUrlsImagens(PropostaDTO proposta)
        {
            foreach (var projeto in proposta.ProjetosDestacados)
            {
                projeto.ImagemUrl = _urlBuilder.ConstruirUrl(projeto.ImagemUrl ?? "");
            }
        }

    }
}