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
            var dto = AvaliacaoFactory.ObterCriarAvaliacaoDTO();

            int freelancerId = 10;

            _repositoryMock
                .Setup(r => r.ConsultarPorServicoIdEAutorIdAsync(dto.ServicoId, freelancerId))
                .ReturnsAsync((Avaliacao?)null);

            _servicoServiceMock
                .Setup(s => s.ConsultarPorIdAsync(dto.ServicoId))
                .ReturnsAsync(ServicoFactory.ObterServicoDTO());

            _servicoServiceMock
                .Setup(s => s.ConsultarPropostaAceitaIdAsync(dto.ServicoId))
                .ReturnsAsync(PropostaFactory.ObterPropostaDTO());

            _repositoryMock
                .Setup(r => r.CriarAsync(It.IsAny<Avaliacao>()))
                .ReturnsAsync((Avaliacao a) => a);

            var result = await _service.CriarAsync(dto, freelancerId);

            Assert.NotNull(result);
            Assert.Equal(5, result.NotaEstrelas);

            _repositoryMock.Verify(r =>
                r.CriarAsync(It.Is<Avaliacao>(a =>
                    a.ServicoId == dto.ServicoId &&
                    a.AutorId == freelancerId &&
                    a.AlvoId == 20 &&
                    a.NotaEstrelas == 5
                )),
                Times.Once
            );
        }

        [Fact]
        public async Task Deve_Lancar_Excecao_Se_Ja_Avaliou()
        {
            var dto = AvaliacaoFactory.ObterCriarAvaliacaoDTO();

            _repositoryMock
                .Setup(r => r.ConsultarPorServicoIdEAutorIdAsync(dto.ServicoId, 10))
                .ReturnsAsync(new Avaliacao());

            await Assert.ThrowsAsync<InvalidOperationException>(() =>
                _service.CriarAsync(dto, 10)
            );
        }

        [Fact]
        public async Task Deve_Definir_AlvoComoFreelancer_Quando_ClienteAvalia()
        {
            int clienteId = 20;

            var dto = AvaliacaoFactory.ObterCriarAvaliacaoDTO();
            var avaliacaoCapturada = new Avaliacao();

            _repositoryMock
                .Setup(r => r.ConsultarPorServicoIdEAutorIdAsync(dto.ServicoId, clienteId))
                .ReturnsAsync((Avaliacao?)null);

            _servicoServiceMock
                .Setup(s => s.ConsultarPorIdAsync(dto.ServicoId))
                .ReturnsAsync(ServicoFactory.ObterServicoDTO());

            _servicoServiceMock
                .Setup(s => s.ConsultarPropostaAceitaIdAsync(dto.ServicoId))
                .ReturnsAsync(PropostaFactory.ObterPropostaDTO());

            _repositoryMock
                .Setup(r => r.CriarAsync(It.IsAny<Avaliacao>()))
                .Callback<Avaliacao>(a => avaliacaoCapturada = a)
                .ReturnsAsync((Avaliacao a) => a);

            await _service.CriarAsync(dto, clienteId);

            Assert.Equal(10, avaliacaoCapturada.AlvoId);
        }

        [Fact]
        public async Task Deve_Definir_AlvoComoCliente_Quando_FreelancerAvalia()
        {
            int freelancerId = 10;

            var dto = AvaliacaoFactory.ObterCriarAvaliacaoDTO();

            var avaliacaoCapturada = new Avaliacao();

            _repositoryMock
                .Setup(r => r.ConsultarPorServicoIdEAutorIdAsync(dto.ServicoId, freelancerId))
                .ReturnsAsync((Avaliacao?)null);

            _servicoServiceMock
                .Setup(s => s.ConsultarPorIdAsync(dto.ServicoId))
                .ReturnsAsync(ServicoFactory.ObterServicoDTO());

            _servicoServiceMock
                .Setup(s => s.ConsultarPropostaAceitaIdAsync(dto.ServicoId))
                .ReturnsAsync(PropostaFactory.ObterPropostaDTO());

            _repositoryMock
                .Setup(r => r.CriarAsync(It.IsAny<Avaliacao>()))
                .Callback<Avaliacao>(a => avaliacaoCapturada = a)
                .ReturnsAsync((Avaliacao a) => a);

            await _service.CriarAsync(dto, freelancerId);

            Assert.Equal(20, avaliacaoCapturada.AlvoId);
        }
    }
}
