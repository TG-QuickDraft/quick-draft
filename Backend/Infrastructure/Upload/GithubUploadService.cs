using Backend.Application.Interfaces.Infrastructure;
using Backend.Application.Validators;
using Backend.Infrastructure.Settings;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using Octokit;

namespace Backend.Infrastructure.Upload
{
    public class GithubUploadService : IUploadService
    {
        private readonly GithubSettings _settings;
        private readonly ArquivoValidator _validator;
        private readonly GitHubClient _client;
        private readonly ILogger<GithubUploadService> _logger;

        public GithubUploadService(
            IOptions<GithubSettings> settings,
            ArquivoValidator arquivoValidator,
            ILogger<GithubUploadService> logger)
        {
            _settings = settings.Value;
            _validator = arquivoValidator;
            _logger = logger;
            _client = new GitHubClient(new ProductHeaderValue("SistemaFreelancer"))
            {
                Credentials = new Credentials(_settings.Token)
            };
            
            // Aumenta o timeout para lidar com arquivos maiores em conexões lentas
            _client.Connection.SetRequestTimeout(TimeSpan.FromMinutes(5));
        }

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

            _logger.LogInformation("Iniciando upload para o GitHub: {Path} ({Size} bytes)", path, arquivo.Length);

            try
            {
                byte[] content;
                using (var stream = arquivo.OpenReadStream())
                {
                    content = new byte[arquivo.Length];
                    int totalRead = 0;
                    while (totalRead < arquivo.Length)
                    {
                        int read = await stream.ReadAsync(content.AsMemory(totalRead, (int)arquivo.Length - totalRead));
                        if (read == 0) break;
                        totalRead += read;
                    }
                }

                if (content.Length == 0)
                    throw new Exception("O arquivo enviado está vazio.");

                string base64Content = Convert.ToBase64String(content);
                
                // Usando a Git Data API para maior performance e suporte a arquivos maiores
                return await ExecutarUploadComRetry(path, fileName, base64Content);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro fatal durante o processo de upload para o GitHub");
                throw;
            }
        }

        private async Task<string> ExecutarUploadComRetry(string path, string fileName, string base64Content, int maxRetries = 3)
        {
            int retryCount = 0;
            int delayMs = 1000;

            while (true)
            {
                try
                {
                    // 1. Criar o Blob
                    _logger.LogDebug("Criando blob no GitHub (Tentativa {Attempt})...", retryCount + 1);
                    var blob = await _client.Git.Blob.Create(_settings.Owner, _settings.Repository, new NewBlob
                    {
                        Content = base64Content,
                        Encoding = EncodingType.Base64
                    });

                    // 2. Obter a referência da branch atual
                    var reference = await _client.Git.Reference.Get(_settings.Owner, _settings.Repository, $"heads/{_settings.Branch}");
                    var latestCommit = await _client.Git.Commit.Get(_settings.Owner, _settings.Repository, reference.Object.Sha);

                    // 3. Criar uma nova árvore baseada no último commit
                    var newTree = new NewTree { BaseTree = latestCommit.Tree.Sha };
                    newTree.Tree.Add(new NewTreeItem
                    {
                        Path = path,
                        Mode = "100644",
                        Type = TreeType.Blob,
                        Sha = blob.Sha
                    });
                    
                    var treeResponse = await _client.Git.Tree.Create(_settings.Owner, _settings.Repository, newTree);

                    // 4. Criar o Commit
                    var newCommit = await _client.Git.Commit.Create(_settings.Owner, _settings.Repository, 
                        new NewCommit($"Upload {fileName}", treeResponse.Sha, latestCommit.Sha));

                    // 5. Atualizar a referência da branch
                    await _client.Git.Reference.Update(_settings.Owner, _settings.Repository, $"heads/{_settings.Branch}", 
                        new ReferenceUpdate(newCommit.Sha));

                    _logger.LogInformation("Upload concluído com sucesso: {Path}", path);

                    return $"https://raw.githubusercontent.com/{_settings.Owner}/{_settings.Repository}/{_settings.Branch}/{path}";
                }
                catch (ApiException ex) when (retryCount < maxRetries - 1 && ((int)ex.StatusCode >= 500 || (int)ex.StatusCode == 409))
                {
                    _logger.LogWarning(ex, "Conflito ou erro de servidor no GitHub (Tentativa {Attempt}). Retentando em {Delay}ms...", 
                        retryCount + 1, delayMs);
                    
                    retryCount++;
                    await Task.Delay(delayMs);
                    delayMs *= 2;
                }
                catch (Exception ex) when (retryCount < maxRetries - 1)
                {
                    _logger.LogWarning(ex, "Erro inesperado no upload (Tentativa {Attempt}). Retentando em {Delay}ms...", 
                        retryCount + 1, delayMs);
                    
                    retryCount++;
                    await Task.Delay(delayMs);
                    delayMs *= 2;
                }
                catch (ApiException ex)
                {
                    _logger.LogError(ex, "Erro da API do GitHub após {Attempts} tentativas: {Message}", 
                        retryCount + 1, ex.ApiError?.Message ?? ex.Message);
                    throw new Exception($"Falha ao fazer upload para o GitHub: {ex.ApiError?.Message ?? ex.Message}", ex);
                }
            }
        }
    }
}
