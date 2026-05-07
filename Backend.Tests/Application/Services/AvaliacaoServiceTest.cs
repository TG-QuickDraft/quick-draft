using AutoMapper;
using Backend.Application.Services;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Domain.Entities;
using Moq;
using Backend.Tests.Common.Factories;

namespace Backend.Tests.Application.Services
{
    public class AvaliacaoServiceTest
    {
        private readonly Mock<IAvaliacaoRepository> _repositoryMock;
        private readonly IMapper _mapper;
        private readonly Mock<IServicoService> _servicoServiceMock;

        private readonly AvaliacaoService _service;

        public AvaliacaoServiceTest()
        {
            _repositoryMock = new Mock<IAvaliacaoRepository>();
            _mapper = MapperTestFactory.Create();
            _servicoServiceMock = new Mock<IServicoService>();

            _service = new AvaliacaoService(
                _repositoryMock.Object,
                _mapper,
                _servicoServiceMock.Object
            );
        }

        [Fact]
        public async Task Deve_Criar_Avaliacao_Com_Sucesso()
        {
            var criarAvaliacaoDto = AvaliacaoFactory.ObterCriarAvaliacaoDTO();
            var servico = ServicoFactory.ObterServicoDTO();
            var proposta = PropostaFactory.ObterPropostaDTO();
    
            int freelancerId = proposta.FreelancerId;

            _repositoryMock
                .Setup(r => r.ConsultarPorServicoIdEAutorIdAsync(criarAvaliacaoDto.ServicoId, freelancerId))
                .ReturnsAsync((Avaliacao?)null);

            _repositoryMock
                .Setup(r => r.CriarAsync(It.IsAny<Avaliacao>()))
                .ReturnsAsync((Avaliacao a) => a);

            _servicoServiceMock
                .Setup(s => s.ConsultarPorIdAsync(criarAvaliacaoDto.ServicoId))
                .ReturnsAsync(servico);

            _servicoServiceMock
                .Setup(s => s.ConsultarPropostaAceitaIdAsync(criarAvaliacaoDto.ServicoId))
                .ReturnsAsync(proposta);

            var result = await _service.CriarAsync(criarAvaliacaoDto, freelancerId);

            Assert.NotNull(result);
            Assert.Equal(criarAvaliacaoDto.NotaEstrelas, result.NotaEstrelas);

            _repositoryMock.Verify(
                r => r.CriarAsync(It.IsAny<Avaliacao>()),
                Times.Once
            );
        }

        [Fact]
        public async Task Deve_Lancar_Excecao_Se_Ja_Avaliou()
        {
            var dto = AvaliacaoFactory.ObterCriarAvaliacaoDTO();

            int userId = 10;

            _repositoryMock
                .Setup(r => r.ConsultarPorServicoIdEAutorIdAsync(dto.ServicoId, userId))
                .ReturnsAsync(new Avaliacao());

            await Assert.ThrowsAsync<InvalidOperationException>(() =>
                _service.CriarAsync(dto, userId)
            );
        }

        [Fact]
        public async Task Deve_Definir_AlvoComoFreelancer_Quando_ClienteAvalia()
        {
            var criarAvaliacaoDto = AvaliacaoFactory.ObterCriarAvaliacaoDTO();
            var proposta = PropostaFactory.ObterPropostaDTO();
            var servico = ServicoFactory.ObterServicoDTO();
            var avaliacaoCapturada = new Avaliacao();

            int clienteId = 20;

            _repositoryMock
                .Setup(r => r.ConsultarPorServicoIdEAutorIdAsync(criarAvaliacaoDto.ServicoId, clienteId))
                .ReturnsAsync((Avaliacao?)null);

            _repositoryMock
                .Setup(r => r.CriarAsync(It.IsAny<Avaliacao>()))
                .Callback<Avaliacao>(a => avaliacaoCapturada = a)
                .ReturnsAsync((Avaliacao a) => a);

            _servicoServiceMock
                .Setup(s => s.ConsultarPorIdAsync(criarAvaliacaoDto.ServicoId))
                .ReturnsAsync(servico);

            _servicoServiceMock
                .Setup(s => s.ConsultarPropostaAceitaIdAsync(criarAvaliacaoDto.ServicoId))
                .ReturnsAsync(proposta);

            await _service.CriarAsync(criarAvaliacaoDto, clienteId);

            Assert.Equal(proposta.FreelancerId, avaliacaoCapturada.AlvoId);
        }

        [Fact]
        public async Task Deve_Definir_AlvoComoCliente_Quando_FreelancerAvalia()
        {
            var criarAvaliacaoDto = AvaliacaoFactory.ObterCriarAvaliacaoDTO();
            var proposta = PropostaFactory.ObterPropostaDTO();
            var servico = ServicoFactory.ObterServicoDTO();
            var avaliacaoCapturada = new Avaliacao();

            int freelancerId = 10;

            _repositoryMock
                .Setup(r => r.ConsultarPorServicoIdEAutorIdAsync(criarAvaliacaoDto.ServicoId, freelancerId))
                .ReturnsAsync((Avaliacao?)null);
            
            _repositoryMock
                .Setup(r => r.CriarAsync(It.IsAny<Avaliacao>()))
                .Callback<Avaliacao>(a => avaliacaoCapturada = a)
                .ReturnsAsync((Avaliacao a) => a);

            _servicoServiceMock
                .Setup(s => s.ConsultarPorIdAsync(criarAvaliacaoDto.ServicoId))
                .ReturnsAsync(servico);

            _servicoServiceMock
                .Setup(s => s.ConsultarPropostaAceitaIdAsync(criarAvaliacaoDto.ServicoId))
                .ReturnsAsync(proposta);

            await _service.CriarAsync(criarAvaliacaoDto, freelancerId);

            Assert.Equal(servico.ClienteId, avaliacaoCapturada.AlvoId);
        }
    }
}
