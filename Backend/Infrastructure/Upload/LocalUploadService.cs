using Backend.Application.Interfaces.Infrastructure;

namespace Backend.Infrastructure.Upload
{
    public class LocalUploadService : IUploadService
    {
        public async Task<string> UploadImagem(IFormFile imagem, string path)
        {
            string folder = Path.Combine($"wwwroot/{path}");
            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            string fileName = imagem.FileName;
            string filePath = Path.Combine(folder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imagem.CopyToAsync(stream);
            }

            return $"{path}/{fileName}";
        }
    }
}