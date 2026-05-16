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

            try
            {
                byte[] content;
                using (var stream = arquivo.OpenReadStream())
                {
                    if (stream.CanSeek)
                    {
                        stream.Position = 0;
                    }
                    
                    using var memoryStream = new MemoryStream();
                    await stream.CopyToAsync(memoryStream);
                    content = memoryStream.ToArray();
                }

                if (content.Length == 0)
                    throw new Exception("O arquivo enviado está vazio.");

                await _client.Repository.Content.CreateFile(
                    _settings.Owner,
                    _settings.Repository,
                    path,
                    new CreateFileRequest($"Upload {fileName}", Convert.ToBase64String(content), _settings.Branch, false)
                );

                return $"https://raw.githubusercontent.com/{_settings.Owner}/{_settings.Repository}/{_settings.Branch}/{path}";
            }
            catch (ApiException ex)
            {
                // Log detalhado para o console do VS/Terminal
                Console.WriteLine($"[GithubUploadService] Erro da API do GitHub: {ex.Message}");
                Console.WriteLine($"[GithubUploadService] StatusCode: {ex.StatusCode}");
                
                var errorMessage = ex.ApiError?.Message ?? ex.Message;
                Console.WriteLine($"[GithubUploadService] ApiErrorMessage: {errorMessage}");
                
                throw new Exception($"Falha ao fazer upload para o GitHub: {errorMessage}", ex);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[GithubUploadService] Erro inesperado: {ex.Message}");
                throw;
            }
        }
    }
}
