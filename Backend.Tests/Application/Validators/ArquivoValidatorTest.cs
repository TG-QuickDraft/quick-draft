using Backend.Application.Validators;
using Backend.Tests.Common.Factories;

namespace Backend.Tests.Application.Validators
{
    public class ArquivoValidatorTest
    {
        private readonly ArquivoValidator _validator = new();

        [Fact]
        public void Deve_Rejeitar_Arquivo_Muito_Grande()
        {
            var file = ArquivoFactory.CriarArquivoFake(tamanho: 6 * 1024 * 1024);

            Assert.Throws<Exception>(() => _validator.ValidarArquivo(file));
        }

        [Fact]
        public void Deve_Rejeitar_Imagem_Muito_Grande()
        {
            var file = ArquivoFactory.CriarArquivoFake(tamanho: 6 * 1024 * 1024);

            Assert.Throws<Exception>(() => _validator.ValidarImagem(file));
        }

        [Theory]
        [InlineData("imagem.jpg", "image/jpeg")]
        [InlineData("imagem.jpeg", "image/jpeg")]
        [InlineData("imagem.png", "image/png")]
        [InlineData("imagem.webp", "image/webp")]
        public void Deve_Aceitar_Extensoes_Validas_Imagem(string fileName, string contentType)
        {
            var file = ArquivoFactory.CriarArquivoFake(fileName, contentType, 1024);

            var exception = Record.Exception(() => _validator.ValidarImagem(file));

            Assert.Null(exception);
        }

        [Theory]
        [InlineData("video.mp4", "video/mp4")]
        [InlineData("arquivo.exe", "application/octet-stream")]
        [InlineData("documento.pdf", "application/pdf")]
        public void Deve_Rejeitar_Arquivos_Invalidos(
            string fileName,
            string contentType)
        {
            var file = ArquivoFactory.CriarArquivoFake(fileName, contentType, 1024);

            Assert.Throws<Exception>(() => _validator.ValidarImagem(file));
        }
    }
}