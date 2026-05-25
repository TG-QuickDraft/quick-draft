using Microsoft.AspNetCore.Http;

namespace Backend.Tests.Common.Factories
{
    public static class ArquivoFactory
    {
        public static IFormFile CriarArquivoFake(
            string nome = "foto.jpg",
            string contentType = "image/jpeg",
            int tamanho = 1024
        )
        {
            var bytes = new byte[tamanho];
            new Random().NextBytes(bytes);

            var stream = new MemoryStream(bytes);

            return new FormFile(stream, 0, bytes.Length, "file", nome)
            {
                Headers = new HeaderDictionary(),
                ContentType = contentType
            };
        }
    }
}
