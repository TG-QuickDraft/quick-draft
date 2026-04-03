using AutoMapper;
using Backend.Application.DTOs.Mensagem;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Domain.Entities;

public class MensagemServicoService(
    IMensagemServicoRepository repository,
    IServicoRepository servicoRepository,
    IPropostaRepository propostaRepository,
    IMapper mapper
) : IMensagemServicoService
{
    private readonly IMensagemServicoRepository _repository = repository;
    private readonly IServicoRepository _servicoRepository = servicoRepository;
    private readonly IPropostaRepository _propostaRepository = propostaRepository;
    private readonly IMapper _mapper = mapper;

    public async Task<MensagemServico> EnviarMensagemAsync(
        EnviarMensagemDTO dto,
        int usuarioLogadoId
    )
    {
        if (string.IsNullOrWhiteSpace(dto.Mensagem))
            throw new ArgumentException("A mensagem não pode ser vazia");
            
        var servico = await _servicoRepository.ConsultarPorIdAsync(dto.ServicoId)
            ?? throw new InvalidOperationException("Serviço não encontrado");

        if (servico.PropostaAceitaId == null)
            throw new InvalidOperationException("Serviço ainda não possui proposta aceita");

        var proposta = await _propostaRepository.ConsultarPorIdAsync(servico.PropostaAceitaId.Value)
            ?? throw new InvalidOperationException("Proposta aceita não encontrada");

        var clienteId = servico.ClienteId;
        var freelancerId = proposta.FreelancerId;

        int destinatarioId;

        if (usuarioLogadoId == clienteId)
            destinatarioId = freelancerId;

        else if (usuarioLogadoId == freelancerId)
            destinatarioId = clienteId;

        else
            throw new UnauthorizedAccessException("Você não faz parte deste chat");

        var mensagem = new MensagemServico
        {
            ServicoId = dto.ServicoId,
            Data = DateTime.UtcNow,
            Mensagem = dto.Mensagem,
            RemetenteUsuarioId = usuarioLogadoId,
            DestinatarioUsuarioId = destinatarioId
        };

        return await _repository.CriarAsync(mensagem);
    }

    public async Task<IEnumerable<MensagemChatDTO>> ObterHistoricoAsync(
        int servicoId,
        int usuarioLogadoId
    )
    {
        var servico = await _servicoRepository.ConsultarPorIdAsync(servicoId)
            ?? throw new InvalidOperationException("Serviço não encontrado");

        if (servico.PropostaAceitaId == null)
            throw new InvalidOperationException("Serviço ainda não possui proposta aceita");

        var proposta = await _propostaRepository.ConsultarPorIdAsync(servico.PropostaAceitaId.Value)
            ?? throw new InvalidOperationException("Proposta aceita não encontrada");

        var clienteId = servico.ClienteId;
        var freelancerId = proposta.FreelancerId;

        if (usuarioLogadoId != clienteId && usuarioLogadoId != freelancerId)
            throw new UnauthorizedAccessException("Você não tem acesso a este chat");

        var mensagens = await _repository.ConsultarPorServicoIdAsync(servicoId);

        return _mapper.Map<IEnumerable<MensagemChatDTO>>(mensagens);
    }
}