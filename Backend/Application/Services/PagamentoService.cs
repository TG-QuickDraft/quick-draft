using Backend.Application.DTOs.Pagamento;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Domain.Constants;
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
            var servico = await _servicoRepository.ConsultarPorIdComPropostaAceitaAsync(dto.ServicoId)
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

            var proposta = servico.PropostaAceita ?? throw new InvalidOperationException("Erro ao obter valor da proposta");

            bool isTaxaFreelancer = !proposta.TaxaSistemaAdicionadaAoTotal;

            decimal valorFinal = isTaxaFreelancer
                ? proposta.ValorTotal
                : proposta.ValorTotal * (1 + Taxa.TAXA);

            Pagamento pagamento = new()
            {
                CartaoCreditoId = clienteId,
                ServicoId = dto.ServicoId,
                Valor = valorFinal,
                isTaxaAplicada = isTaxaFreelancer,
                ValorTaxa = Taxa.TAXA
            };

            await _pagamentoRepository.CriarAsync(pagamento);

            return true;
        }

        public async Task<TaxaDTO> ObterTaxaAsync()
        {
            return new()
            {
                Valor = Taxa.TAXA
            };
        }
    }
}