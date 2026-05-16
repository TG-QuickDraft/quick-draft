using Backend.Application.Interfaces.Infrastructure;
using Backend.Application.Validators;
using Backend.Infrastructure.Settings;
using Microsoft.Extensions.Options;
using Octokit;

namespace Backend.Infrastructure.Upload
{
    public class GithubUploadService(
        IOptions<GithubSettings> settings,
        ArquivoValidator arquivoValidator) : IUploadService
    {
        private readonly GithubSettings _settings = settings.Value;
        private readonly ArquivoValidator _validator = arquivoValidator;
        private readonly GitHubClient _client = new(new ProductHeaderValue("SistemaFreelancer"))
        {
            Credentials = new Credentials(settings.Value.Token)
        };

        public async Task<string> UploadImagem(IFormFile imagem, string folder)
        {
            _validator.ValidarImagem(imagem);
            return await SalvarNoGithub(imagem, folder);
        }

        public async Task<string> UploadArquivo(IFormFile arquivo, string folder)
        {
            _validator.ValidarArquivo(arquivo);
            return await SalvarNoGithub(arquivo, folder);
        }

        private async Task<string> SalvarNoGithub(IFormFile arquivo, string folder)
        {
            var extensao = Path.GetExtension(arquivo.FileName).ToLower();
            var fileName = $"{DateTime.UtcNow:yyyyMMddHHmmss}_{Guid.NewGuid()}{extensao}";
            var path = $"{folder}/{fileName}";

            using var stream = arquivo.OpenReadStream();
            using var memoryStream = new MemoryStream();
            await stream.CopyToAsync(memoryStream);
            var content = memoryStream.ToArray();

            await _client.Repository.Content.CreateFile(
                _settings.Owner,
                _settings.Repository,
                path,
                new CreateFileRequest($"Upload {fileName}", Convert.ToBase64String(content), _settings.Branch, false)
            );

            return $"https://raw.githubusercontent.com/{_settings.Owner}/{_settings.Repository}/{_settings.Branch}/{path}";
        }
    }
}
