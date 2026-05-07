using AutoMapper;
using Backend.Application.DTOs.Entrega;
using Backend.Application.Interfaces.Infrastructure;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Domain.Entities;

namespace Backend.Application.Services
{
    public class EntregaService(
        IEntregaRepository repository,
        IServicoService servicoService,
        IPropostaService propostaService,
        IMapper mapper,
        IUploadService uploadService,
        IUrlBuilder urlBuilder
    ) : IEntregaService
    {
        private readonly IEntregaRepository _repository = repository;
        private readonly IServicoService _servicoService = servicoService;
        private readonly IPropostaService _propostaService = propostaService;
        private readonly IMapper _mapper = mapper;
        private readonly IUploadService _uploadService = uploadService;
        private readonly IUrlBuilder _urlBuilder = urlBuilder;

        public async Task<EntregaDTO?> ConsultarPorIdServicoAsync(
            int servicoId,
            int usuarioId
        )
        {
            Entrega? entrega = await _repository.ConsultarPorIdServicoAsync(servicoId);

            if (entrega == null)
            {
                return null;
            }

            var servico = await _servicoService.ConsultarPorIdAsync(servicoId)
                ?? throw new InvalidOperationException("Serviço não encontrado!");

            var propostaAceita =
                await _servicoService.ConsultarPropostaAceitaIdAsync(servicoId)
                    ?? throw new InvalidOperationException("Proposta não encontrada!");

            if (servico.ClienteId != usuarioId && propostaAceita.FreelancerId != usuarioId)
            {
                throw new UnauthorizedAccessException("Você não pertence a este serviço!");
            }

            EntregaDTO dto = _mapper.Map<EntregaDTO>(entrega);

            dto.UrlArquivo = _urlBuilder.ConstruirUrl(dto.UrlArquivo);

            return dto;
        }

        public async Task<EntregaDTO> RealizarEntregaAsync(
            RealizarEntregaDTO dto, int freelancerId)
        {
            var servico = await _servicoService.ConsultarPorIdAsync(dto.ServicoId)
                ?? throw new InvalidOperationException("Serviço não encontrado!");

            if (servico.IsEntregue)
            {
                throw new InvalidOperationException("Serviço já foi entregue!");
            }
            
            var propostaAceita = await _servicoService.ConsultarPropostaAceitaIdAsync(dto.ServicoId)
                                ?? throw new Exception("Proposta não encontrada.");

            if (propostaAceita.FreelancerId != freelancerId)
            {
                throw new Exception("Freelancer não é o vencedor da proposta.");
            }

            if (dto.Arquivo == null)
            {
                throw new ArgumentException("Nenhum arquivo enviado para entrega!");
            }

            string path = Path.Combine(
              "uploads",
              "servicos",
              "entregas",
              dto.ServicoId.ToString()
            );

            string urlArquivo = await _uploadService.UploadArquivo(dto.Arquivo, path);

            Entrega entregaSalva = await _repository.CriarEntregaAsync(
                new(){
                    ServicoId = dto.ServicoId,
                    UrlArquivo = urlArquivo
                }
            );

            await _servicoService.AlterarServicoParaEntregue(dto.ServicoId);

            return _mapper.Map<EntregaDTO>(entregaSalva);
        }
    }
}