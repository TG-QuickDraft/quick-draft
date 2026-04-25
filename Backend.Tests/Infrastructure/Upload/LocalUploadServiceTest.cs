using System.Text;
using Backend.Application.Validators;
using Backend.Infrastructure.Upload;
using Microsoft.AspNetCore.Http;
using Moq;

namespace Backend.Tests.Infrastructure.Upload
{
    public class LocalUploadServiceTest
    {
        [Fact]
        public async Task UploadImagem_DeveSalvarArquivoNoDisco()
        {
            var service = CriarService();
            var arquivo = CriarArquivoFake("imagem.png", "fake image content");

            var caminho = await service.UploadImagem(arquivo, PastaTeste);
            var caminhoCompleto = Path.Combine("wwwroot", caminho);

            Assert.True(File.Exists(caminhoCompleto));
            Assert.Equal(
                "fake image content",
                await File.ReadAllTextAsync(caminhoCompleto)
            );

            File.Delete(caminhoCompleto);
        }

        private const string PastaTeste = "uploads-test";

        private static LocalUploadService CriarService()
            => new(new Mock<ArquivoValidator>().Object);

        private static FormFile CriarArquivoFake(string nome, string conteudo)
        {
            var stream = new MemoryStream(Encoding.UTF8.GetBytes(conteudo));
            return new FormFile(stream, 0, stream.Length, "file", nome);
        }
    }
}