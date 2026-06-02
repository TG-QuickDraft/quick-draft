using Backend.Application.Interfaces.Infrastructure;
using Backend.Application.Validators;
using Backend.Infrastructure.Settings;
using Microsoft.Extensions.Options;
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
            ILogger<GithubUploadService> logger
        )
        {
            _settings = settings.Value;
            _validator = arquivoValidator;
            _logger = logger;
            _client = new GitHubClient(new ProductHeaderValue("SistemaFreelancer"))
            {
                Credentials = new Credentials(_settings.Token),
            };

            _client.Connection.SetRequestTimeout(TimeSpan.FromMinutes(5));
        }

        public async Task DeletarArquivo(string? path)
        {
            if (string.IsNullOrEmpty(path))
                return;

            string prefix =
                $"https://raw.githubusercontent.com/{_settings.Owner}/{_settings.Repository}/{_settings.Branch}/";
            if (!path.StartsWith(prefix))
            {
                _logger.LogWarning(
                    "O caminho do arquivo não corresponde ao repositório configurado para deleção: {Path}",
                    path
                );
                return;
            }

            string relativePath = path.Substring(prefix.Length);

            try
            {
                _logger.LogInformation(
                    "Iniciando deleção de arquivo no GitHub: {Path}",
                    relativePath
                );

                var contents = await _client.Repository.Content.GetAllContents(
                    _settings.Owner,
                    _settings.Repository,
                    relativePath
                );

                var fileContent = contents.FirstOrDefault();
                if (fileContent == null)
                {
                    _logger.LogWarning(
                        "Arquivo não encontrado no GitHub para deleção: {Path}",
                        relativePath
                    );
                    return;
                }

                await _client.Repository.Content.DeleteFile(
                    _settings.Owner,
                    _settings.Repository,
                    relativePath,
                    new DeleteFileRequest(
                        $"Delete {Path.GetFileName(relativePath)}",
                        fileContent.Sha,
                        _settings.Branch
                    )
                );

                _logger.LogInformation(
                    "Arquivo deletado com sucesso do GitHub: {Path}",
                    relativePath
                );
            }
            catch (Octokit.NotFoundException)
            {
                _logger.LogWarning("Arquivo não encontrado no GitHub (404): {Path}", relativePath);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao deletar arquivo do GitHub: {Path}", relativePath);
            }
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

            _logger.LogInformation(
                "Iniciando upload otimizado para o GitHub: {Path} ({Size} bytes)",
                path,
                arquivo.Length
            );

            var stopwatch = System.Diagnostics.Stopwatch.StartNew();

            try
            {
                byte[] content;
                using (var stream = arquivo.OpenReadStream())
                {
                    using var ms = new MemoryStream((int)arquivo.Length);
                    await stream.CopyToAsync(ms);
                    content = ms.ToArray();
                }

                if (content.Length == 0)
                    throw new Exception("O arquivo enviado está vazio.");

                _logger.LogDebug(
                    "Leitura do arquivo concluída em {Elapsed}ms",
                    stopwatch.ElapsedMilliseconds
                );

                string base64Content = Convert.ToBase64String(content);
                _logger.LogDebug(
                    "Conversão Base64 concluída em {Elapsed}ms. Tamanho string: {Size}",
                    stopwatch.ElapsedMilliseconds,
                    base64Content.Length
                );

                _logger.LogInformation(
                    "Iniciando upload do blob e busca de metadados em paralelo..."
                );

                var blobTask = CriarBlobComRetry(base64Content);
                var branchMetadataTask = ObterMetadadosBranch();

                await Task.WhenAll(blobTask, branchMetadataTask);

                var blobSha = blobTask.Result;
                var (latestCommitSha, baseTreeSha) = branchMetadataTask.Result;

                _logger.LogInformation(
                    "Blob criado (SHA: {Sha}) e metadados obtidos em {Elapsed}ms",
                    blobSha,
                    stopwatch.ElapsedMilliseconds
                );

                var commitResult = await ExecutarCommitComRetry(
                    path,
                    fileName,
                    blobSha,
                    latestCommitSha,
                    baseTreeSha
                );

                stopwatch.Stop();
                _logger.LogInformation(
                    "Processo de upload completo em {Elapsed}ms: {Path}",
                    stopwatch.ElapsedMilliseconds,
                    path
                );

                return commitResult;
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Erro fatal durante o processo de upload para o GitHub após {Elapsed}ms",
                    stopwatch.ElapsedMilliseconds
                );
                throw;
            }
        }

        private async Task<string> CriarBlobComRetry(string base64Content, int maxRetries = 3)
        {
            int retryCount = 0;
            int delayMs = 1000;

            while (true)
            {
                try
                {
                    var blob = await _client.Git.Blob.Create(
                        _settings.Owner,
                        _settings.Repository,
                        new NewBlob { Content = base64Content, Encoding = EncodingType.Base64 }
                    );
                    return blob.Sha;
                }
                catch (Exception ex) when (retryCount < maxRetries - 1)
                {
                    retryCount++;
                    _logger.LogWarning(
                        ex,
                        "Erro ao criar blob (Tentativa {Attempt}). Retentando em {Delay}ms...",
                        retryCount,
                        delayMs
                    );
                    await Task.Delay(delayMs);
                    delayMs *= 2;
                }
                catch (Exception ex)
                {
                    _logger.LogError(
                        ex,
                        "Falha definitiva ao criar blob após {Attempts} tentativas",
                        retryCount + 1
                    );
                    throw;
                }
            }
        }

        private async Task<(string CommitSha, string TreeSha)> ObterMetadadosBranch()
        {
            var reference = await _client.Git.Reference.Get(
                _settings.Owner,
                _settings.Repository,
                $"heads/{_settings.Branch}"
            );
            var latestCommit = await _client.Git.Commit.Get(
                _settings.Owner,
                _settings.Repository,
                reference.Object.Sha
            );
            return (latestCommit.Sha, latestCommit.Tree.Sha);
        }

        private async Task<string> ExecutarCommitComRetry(
            string path,
            string fileName,
            string blobSha,
            string latestCommitSha,
            string baseTreeSha,
            int maxRetries = 3
        )
        {
            int retryCount = 0;
            int delayMs = 500;

            while (true)
            {
                try
                {
                    var newTree = new NewTree { BaseTree = baseTreeSha };
                    newTree.Tree.Add(
                        new NewTreeItem
                        {
                            Path = path,
                            Mode = "100644",
                            Type = TreeType.Blob,
                            Sha = blobSha,
                        }
                    );

                    var treeResponse = await _client.Git.Tree.Create(
                        _settings.Owner,
                        _settings.Repository,
                        newTree
                    );

                    var newCommit = await _client.Git.Commit.Create(
                        _settings.Owner,
                        _settings.Repository,
                        new NewCommit($"Upload {fileName}", treeResponse.Sha, latestCommitSha)
                    );

                    await _client.Git.Reference.Update(
                        _settings.Owner,
                        _settings.Repository,
                        $"heads/{_settings.Branch}",
                        new ReferenceUpdate(newCommit.Sha)
                    );

                    return $"https://raw.githubusercontent.com/{_settings.Owner}/{_settings.Repository}/{_settings.Branch}/{path}";
                }
                catch (ApiException ex)
                    when (retryCount < maxRetries - 1
                        && (
                            ex.StatusCode == System.Net.HttpStatusCode.Conflict
                            || (int)ex.StatusCode >= 500
                        )
                    )
                {
                    retryCount++;
                    _logger.LogWarning(
                        "Conflito de concorrência no commit. Re-obtendo metadados e retentando (Tentativa {Attempt})...",
                        retryCount
                    );

                    var metadados = await ObterMetadadosBranch();
                    latestCommitSha = metadados.CommitSha;
                    baseTreeSha = metadados.TreeSha;

                    await Task.Delay(delayMs);
                    delayMs *= 2;
                }
                catch (Exception ex) when (retryCount < maxRetries - 1)
                {
                    retryCount++;
                    _logger.LogWarning(
                        ex,
                        "Erro inesperado no commit (Tentativa {Attempt}). Retentando...",
                        retryCount
                    );
                    await Task.Delay(delayMs);
                }
                catch (Exception ex)
                {
                    _logger.LogError(
                        ex,
                        "Falha definitiva ao realizar commit após {Attempts} tentativas",
                        retryCount + 1
                    );
                    throw;
                }
            }
        }
    }
}
