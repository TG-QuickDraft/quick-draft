using Backend.Application.Interfaces.Infrastructure;
using Backend.Application.Validators;

namespace Backend.Infrastructure.Upload
{
    public class LocalUploadService(ImagemValidator validator) : IUploadService
    {
        private readonly ImagemValidator _validator = validator;

        public async Task<string> UploadImagem(IFormFile imagem, string path)
        {
            _validator.Validar(imagem);

            string folder = Path.Combine("wwwroot", path);
            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            var extensao = Path.GetExtension(imagem.FileName).ToLower();
            var fileName = $"{DateTime.UtcNow:yyyyMMddHHmmss}_{Guid.NewGuid()}{extensao}";

            string filePath = Path.Combine(folder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imagem.CopyToAsync(stream);
            }

            return $"{path}/{fileName}";
        }
    }
}