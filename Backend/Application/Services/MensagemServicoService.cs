using Backend.Application.DTOs;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Domain.Entities;

public class MensagemServicoService(
    IMensagemServicoRepository repository,
    IServicoRepository servicoRepository,
    IPropostaRepository propostaRepository
) : IMensagemServicoService
{
    private readonly IMensagemServicoRepository _repository = repository;
    private readonly IServicoRepository _servicoRepository = servicoRepository;
    private readonly IPropostaRepository _propostaRepository = propostaRepository;

    public async Task EnviarMensagemAsync(
        EnviarMensagemDTO dto,
        int usuarioLogadoId
    )
    {
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

        await _repository.CriarAsync(mensagem);
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

        return mensagens
            .OrderBy(m => m.Data)
            .Select(m => new MensagemChatDTO
            {
                UsuarioId = m.RemetenteUsuarioId,
                Mensagem = m.Mensagem
            });
    }
}