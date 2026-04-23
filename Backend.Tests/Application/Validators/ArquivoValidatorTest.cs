using Backend.Application.Validators;
using Microsoft.AspNetCore.Http;

namespace Backend.Tests.Application.Validators
{
    public class ArquivoValidatorTest
    {
        private readonly ArquivoValidator _validator = new();

        [Fact]
        public void Deve_Rejeitar_Arquivo_Muito_Grande()
        {
            var file = CriarArquivoFake("imagem.jpg", 6 * 1024 * 1024);

            Assert.Throws<Exception>(() => _validator.ValidarArquivo(file));
        }

        [Fact]
        public void Deve_Rejeitar_Imagem_Muito_Grande()
        {
            var file = CriarArquivoFake("imagem.jpg", 6 * 1024 * 1024);

            Assert.Throws<Exception>(() => _validator.ValidarImagem(file));
        }

        [Theory]
        [InlineData("imagem.jpg")]
        [InlineData("imagem.jpeg")]
        [InlineData("imagem.png")]
        [InlineData("imagem.webp")]
        public void Deve_Aceitar_Extensoes_Validas_Imagem(string fileName)
        {
            var file = CriarArquivoFake(fileName, 1024);

            var exception = Record.Exception(() => _validator.ValidarImagem(file));

            Assert.Null(exception);
        }

        [Theory]
        [InlineData("video.mp4")]
        [InlineData("arquivo.exe")]
        [InlineData("documento.pdf")]
        public void Deve_Rejeitar_Extensoes_Invalidas_Imagem(string fileName)
        {
            var file = CriarArquivoFake(fileName, 1024);

            Assert.Throws<Exception>(() => _validator.ValidarImagem(file));
        }

        private static FormFile CriarArquivoFake(string nome, long tamanho)
        {
            var stream = new MemoryStream(new byte[tamanho]);

            return new FormFile(stream, 0, tamanho, "file", nome)
            {
                Headers = new HeaderDictionary(),
                ContentType = "image/jpeg"
            };
        }
    }
}