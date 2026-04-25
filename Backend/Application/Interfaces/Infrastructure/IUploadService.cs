namespace Backend.Application.Interfaces.Infrastructure
{
    public interface IUploadService
    {
        public Task<string> UploadImagem(IFormFile imagem, string folder);
        public Task<string> UploadArquivo(IFormFile arquivo, string folder);
    }
}