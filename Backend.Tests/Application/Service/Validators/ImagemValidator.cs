using Backend.Application.Validators;
using Microsoft.AspNetCore.Http;

namespace Backend.Tests.Application.Service.Validators
{
    public class ImagemValidatorTests
    {
        private readonly ImagemValidator _validator = new();

        [Theory]
        [InlineData("imagem.jpg")]
        [InlineData("imagem.jpeg")]
        [InlineData("imagem.png")]
        [InlineData("imagem.webp")]
        public void Deve_Aceitar_Extensoes_Validas(string fileName)
        {
            var file = CriarArquivoFake(fileName, 1024);

            var exception = Record.Exception(() => _validator.Validar(file));

            Assert.Null(exception);
        }

        [Theory]
        [InlineData("video.mp4")]
        [InlineData("arquivo.exe")]
        [InlineData("documento.pdf")]
        public void Deve_Rejeitar_Extensoes_Invalidas(string fileName)
        {
            var file = CriarArquivoFake(fileName, 1024);

            Assert.Throws<Exception>(() => _validator.Validar(file));
        }

        [Fact]
        public void Deve_Rejeitar_Imagem_Muito_Grande()
        {
            var file = CriarArquivoFake("imagem.jpg", 6 * 1024 * 1024);

            Assert.Throws<Exception>(() => _validator.Validar(file));
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