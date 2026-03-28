using AutoMapper;
using Backend.Application.DTOs.Servico;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Application.Pagination;
using Backend.Application.Pagination.Extensions;
using Backend.Domain.Entities;

namespace Backend.Application.Services
{
    public class ServicoService : IServicoService
    {
        private readonly IServicoRepository _repository;
        private readonly IPropostaRepository _propostaRepository;
        private readonly IMapper _mapper;

        public ServicoService(
            IServicoRepository repository,
            IPropostaRepository propostaRepository,
            IMapper mapper
        )
        {
            _repository = repository;
            _propostaRepository = propostaRepository;
            _mapper = mapper;
        }

        public async Task<ServicoDTO> CriarAsync(CriarServicoDTO criarServico, int usuarioId)
        {
            Servico servico = new()
            {
                Nome = criarServico.Nome,
                Descricao = criarServico.Descricao,
                OrcamentoIsAberto = criarServico.OrcamentoIsAberto,
                Prazo = criarServico.Prazo,
                ValorMinimo = criarServico.ValorMinimo,
                ClienteId = usuarioId,
                IsEntregue = false,
                PropostaAceitaId = null,
            };

            Servico servicoCriado = await _repository.CriarAsync(servico);

            return _mapper.Map<ServicoDTO>(servicoCriado);
        }

        public async Task<PagedResult<ServicoDTO>> ConsultarTodosAsync(
            FiltroServicoDTO filtro,
            int pagina,
            int tamanhoPagina
        )
        {
            pagina = pagina < 1 ? 1 : pagina;
            tamanhoPagina = tamanhoPagina < 1 ? 30 : tamanhoPagina;
            tamanhoPagina = tamanhoPagina > 100 ? 100 : tamanhoPagina;

            var list = await _repository.ConsultarTodosAsync(filtro, pagina, tamanhoPagina);
            return list.Map<Servico, ServicoDTO>(_mapper);
        }

        public async Task<ServicoDTO?> ConsultarPorIdAsync(int id)
        {
            var servico = await _repository.ConsultarPorIdAsync(id);

            if (servico == null)
                return null;

            return _mapper.Map<ServicoDTO>(servico);
        }

        public async Task<bool> AtualizarAsync(AtualizarServicoDTO dto, int clienteId)
        {
            Servico servicoEntidade =
                await _repository.ConsultarPorIdAsync(dto.Id)
                ?? throw new InvalidOperationException("Serviço não encontrado");

            if (servicoEntidade.ClienteId != clienteId)
            {
                throw new UnauthorizedAccessException(
                    "Cliente não autorizado a atualizar este serviço"
                );
            }

            servicoEntidade.Nome = dto.Nome;
            servicoEntidade.Descricao = dto.Descricao;
            servicoEntidade.Prazo = dto.Prazo;
            servicoEntidade.ValorMinimo = dto.ValorMinimo;

            return await _repository.AtualizarAsync(servicoEntidade);
        }

        public async Task<bool> AceitarPropostaAsync(int servicoId, int propostaId, int clienteId)
        {
            var servico = await _repository.ConsultarPorIdAsync(servicoId)
                ?? throw new InvalidOperationException("Serviço não encontrado");

            if (servico.ClienteId != clienteId)
                throw new UnauthorizedAccessException("Não autorizado");

            if (servico.PropostaAceitaId != null)
                throw new InvalidOperationException("Serviço já possui proposta aceita");

            var proposta = await _propostaRepository.ConsultarPorIdAsync(propostaId);

            if (proposta == null || proposta.ServicoId != servicoId)
                throw new InvalidOperationException("Proposta não pertence ao serviço");

            servico.PropostaAceitaId = propostaId;

            return await _repository.AtualizarAsync(servico);
        }

        public async Task<PagedResult<ServicoDTO>> ConsultarPorClienteAsync(
            int clienteId,
            int pagina,
            int tamanhoPagina
        )
        {
            pagina = pagina < 1 ? 1 : pagina;
            tamanhoPagina = tamanhoPagina < 1 ? 30 : tamanhoPagina;
            tamanhoPagina = tamanhoPagina > 100 ? 100 : tamanhoPagina;

            var list = await _repository.ConsultarPorClienteAsync(clienteId, pagina, tamanhoPagina);

            return list.Map<Servico, ServicoDTO>(_mapper);
        }
    }
}
