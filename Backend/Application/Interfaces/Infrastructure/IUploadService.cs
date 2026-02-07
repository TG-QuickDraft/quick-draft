namespace Backend.Application.Interfaces.Infrastructure
{
    public interface IUploadService
    {
        public Task<string> UploadImagem(IFormFile imagem, string folder);
    }
}