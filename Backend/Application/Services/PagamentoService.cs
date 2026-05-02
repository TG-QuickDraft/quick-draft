using Backend.Application.DTOs.Pagamento;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Domain.Entities;

namespace Backend.Application.Services
{
    public class PagamentoService(
        IPagamentoRepository pagamentoRepository,
        IServicoRepository servicoRepository,
        ICartaoCreditoRepository cartaoRepository
    ) : IPagamentoService
    {
        private readonly IPagamentoRepository _pagamentoRepository = pagamentoRepository;
        private readonly IServicoRepository _servicoRepository = servicoRepository;
        private readonly ICartaoCreditoRepository _cartaoRepository = cartaoRepository;

        public async Task<bool> RealizarPagamentoAsync(CriarPagamentoDTO dto, int clienteId)
        {
            var servico = await _servicoRepository.ConsultarPorIdComPropostaAsync(dto.ServicoId)
                ?? throw new InvalidOperationException("Serviço não encontrado");

            if (servico.ClienteId != clienteId)
                throw new UnauthorizedAccessException("Você não pode pagar este serviço");

            if (!servico.IsEntregue)
                throw new InvalidOperationException("Serviço ainda não foi entregue");

            if (servico.PropostaAceitaId == null)
                throw new InvalidOperationException("Serviço não possui proposta aceita");

            var cartao = await _cartaoRepository.ConsultarPorIdClienteAsync(clienteId);
            if (cartao == null)
                throw new InvalidOperationException("Cliente não possui cartão cadastrado");

            bool jaPago = await _pagamentoRepository.ExistePagamentoPorServico(dto.ServicoId);
            if (jaPago)
                throw new InvalidOperationException("Este serviço já foi pago");

            decimal valor = servico.PropostaAceita?.ValorTotal
                ?? throw new InvalidOperationException("Erro ao obter valor da proposta");

            Pagamento pagamento = new()
            {
                CartaoCreditoId = clienteId,
                ServicoId = dto.ServicoId,
                Valor = valor
            };

            await _pagamentoRepository.CriarAsync(pagamento);

            return true;
        }
    }
}