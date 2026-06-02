using AutoMapper;
using Backend.Application.Services;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Domain.Entities;
using Moq;
using Backend.Tests.Common.Factories;
using Backend.Application.Interfaces.Infrastructure;
using Microsoft.AspNetCore.Http;

namespace Backend.Tests.Application.Services
{
    public class UsuarioServiceTest
    {
        public class CriarAsync
        {
            private readonly Mock<IUsuarioRepository> _repositoryMock;
            private readonly IMapper _mapper;
            private readonly Mock<IClienteService> _clienteServiceMock;
            private readonly Mock<IFreelancerService> _freelancerServiceMock;
            private readonly Mock<IUploadService> _uploadServiceMock;
            private readonly Mock<IUrlBuilder> _urlBuilderMock;

            private readonly UsuarioService _service;

            public CriarAsync()
            {
                _repositoryMock = new Mock<IUsuarioRepository>();
                _mapper = MapperTestFactory.Create();
                _clienteServiceMock = new Mock<IClienteService>();
                _freelancerServiceMock = new Mock<IFreelancerService>();
                _uploadServiceMock = new Mock<IUploadService>();
                _urlBuilderMock = new Mock<IUrlBuilder>();

                _service = new UsuarioService(
                    _repositoryMock.Object,
                    _mapper,
                    _clienteServiceMock.Object,
                    _freelancerServiceMock.Object,
                    _uploadServiceMock.Object,
                    _urlBuilderMock.Object
                );
            }

            [Fact]
            public async Task CriarAsync_DeveCriarUsuario_SemFoto()
            {
                var dto = UsuarioFactory.ObterCriarUsuarioDTO(incluirFoto: false);
                var usuario = new Usuario { Id = 1 };
                var usuarioDto = UsuarioFactory.ObterUsuarioDTO();

                _repositoryMock
                    .Setup(r => r.CriarAsync(It.IsAny<Usuario>()))
                    .ReturnsAsync(usuario);

                _clienteServiceMock
                    .Setup(c => c.CriarAsync(usuario.Id))
                    .ReturnsAsync(ClienteFactory.ObterClienteDTO());

                var resultado = await _service.CriarAsync(dto);

                Assert.NotNull(resultado);

                _repositoryMock.Verify(r => r.CriarAsync(It.IsAny<Usuario>()), Times.Once);
                _clienteServiceMock.Verify(c => c.CriarAsync(usuario.Id), Times.Once);

                _uploadServiceMock.Verify(
                    u => u.UploadImagem(It.IsAny<IFormFile>(), It.IsAny<string>()),
                    Times.Never
                );
            }

            [Fact]
            public async Task CriarAsync_DeveFazerRollback_SeUploadFalhar()
            {
                var dto = UsuarioFactory.ObterCriarUsuarioDTO();

                var usuario = new Usuario { Id = 1 };

                _repositoryMock
                    .Setup(r => r.CriarAsync(It.IsAny<Usuario>()))
                    .ReturnsAsync(usuario);

                _uploadServiceMock
                    .Setup(u => u.UploadImagem(It.IsAny<IFormFile>(), It.IsAny<string>()))
                    .ThrowsAsync(new Exception("upload falhou"));

                await Assert.ThrowsAsync<InvalidOperationException>(
                    () => _service.CriarAsync(dto)
                );

                _repositoryMock.Verify(r => r.DeletarAsync(usuario.Id), Times.Once);
            }

            [Fact]
            public async Task CriarAsync_DeveFazerRollback_SeCriacaoPerfilFalhar()
            {
                var dto = UsuarioFactory.ObterCriarUsuarioDTO();

                var usuario = new Usuario { Id = 1 };

                _repositoryMock
                    .Setup(r => r.CriarAsync(It.IsAny<Usuario>()))
                    .ReturnsAsync(usuario);

                _clienteServiceMock
                    .Setup(c => c.CriarAsync(usuario.Id))
                    .ThrowsAsync(new InvalidOperationException());

                await Assert.ThrowsAsync<InvalidOperationException>(
                    () => _service.CriarAsync(dto)
                );

                _repositoryMock.Verify(r => r.DeletarAsync(usuario.Id), Times.Once);
            }
        }
    }
}
