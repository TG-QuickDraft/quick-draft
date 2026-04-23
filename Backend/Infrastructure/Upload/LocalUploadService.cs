using Backend.Application.Interfaces.Infrastructure;
using Backend.Application.Validators;

namespace Backend.Infrastructure.Upload
{
    public class LocalUploadService(ArquivoValidator arquivoValidator) : IUploadService
    {
        private readonly ArquivoValidator _validator = arquivoValidator;

        public async Task<string> UploadImagem(IFormFile imagem, string folder)
        {
            _validator.ValidarImagem(imagem);

            string fileName = await SalvarArquivo(imagem, folder);

            return $"{folder}/{fileName}";
        }

        public async Task<string> UploadArquivo(IFormFile arquivo, string folder)
        {
            _validator.ValidarArquivo(arquivo);

            string fileName = await SalvarArquivo(arquivo, folder);

            return $"{folder}/{fileName}";
        }

        private static async Task<string> SalvarArquivo(IFormFile arquivo, string folder)
        {
            string path = Path.Combine("wwwroot", folder);
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            var extensao = Path.GetExtension(arquivo.FileName).ToLower();
            var fileName = $"{DateTime.UtcNow:yyyyMMddHHmmss}_{Guid.NewGuid()}{extensao}";

            string filePath = Path.Combine(path, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await arquivo.CopyToAsync(stream);
            }

            return fileName;
        }
    }
}