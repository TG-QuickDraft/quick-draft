using Backend.Application.Interfaces.Infrastructure;
using Backend.Application.Validators;
using Backend.Infrastructure.Settings;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;

namespace Backend.Infrastructure.Upload
{
    public class GoogleDriveUploadService : IUploadService
    {
        private readonly GoogleDriveSettings _settings;
        private readonly ArquivoValidator _validator;
        private readonly DriveService _service;
        private readonly ILogger<GoogleDriveUploadService> _logger;

        public GoogleDriveUploadService(
            IOptions<GoogleDriveSettings> options, 
            ArquivoValidator arquivoValidator,
            ILogger<GoogleDriveUploadService> logger)
        {
            _settings = options.Value;
            _validator = arquivoValidator;
            _logger = logger;

            try 
            {
                // Formata a chave privada para garantir que as quebras de linha sejam interpretadas corretamente
                string privateKey = _settings.PrivateKey.Replace("\\n", "\n");

                var credential = new ServiceAccountCredential(
                    new ServiceAccountCredential.Initializer(_settings.ServiceAccountEmail)
                    {
                        Scopes = new[] { DriveService.Scope.DriveFile }
                    }.FromPrivateKey(privateKey));

                _service = new DriveService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = "SistemaFreelancer"
                });
                _logger.LogInformation("GoogleDriveUploadService inicializado com sucesso para {Email}", _settings.ServiceAccountEmail);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao inicializar GoogleDriveUploadService");
                throw;
            }
        }

        public async Task<string> UploadImagem(IFormFile imagem, string folder)
        {
            _validator.ValidarImagem(imagem);
            return await SalvarNoDrive(imagem);
        }

        public async Task<string> UploadArquivo(IFormFile arquivo, string folder)
        {
            _validator.ValidarArquivo(arquivo);
            return await SalvarNoDrive(arquivo);
        }

        private async Task<string> SalvarNoDrive(IFormFile arquivo)
        {
            try
            {
                var extensao = Path.GetExtension(arquivo.FileName).ToLower();
                var fileName = $"{DateTime.UtcNow:yyyyMMddHHmmss}_{Guid.NewGuid()}{extensao}";

                _logger.LogInformation("Iniciando upload para o Google Drive: {FileName}", fileName);

                var fileMetadata = new Google.Apis.Drive.v3.Data.File()
                {
                    Name = fileName,
                    Parents = new List<string> { _settings.FolderId }
                };

                FilesResource.CreateMediaUpload request;
                using (var stream = arquivo.OpenReadStream())
                {
                    request = _service.Files.Create(fileMetadata, stream, arquivo.ContentType);
                    request.Fields = "id";
                    var progress = await request.UploadAsync();
                    
                    if (progress.Status == Google.Apis.Upload.UploadStatus.Failed)
                    {
                        _logger.LogError("Falha no upload para o Google Drive: {Exception}", progress.Exception?.Message);
                        throw new Exception($"Erro no Google Drive: {progress.Exception?.Message}", progress.Exception);
                    }
                }

                var file = request.ResponseBody;

                if (file == null)
                {
                    _logger.LogError("Corpo da resposta do Google Drive está vazio após upload.");
                    throw new Exception("Falha ao obter resposta do Google Drive.");
                }

                _logger.LogInformation("Arquivo enviado com sucesso. ID: {FileId}. Definindo permissões públicas...", file.Id);
                
                // Tornar o arquivo público (leitura para todos com o link)
                var permission = new Google.Apis.Drive.v3.Data.Permission
                {
                    Type = "anyone",
                    Role = "reader"
                };
                await _service.Permissions.Create(permission, file.Id).ExecuteAsync();

                _logger.LogInformation("Permissões definidas. Upload concluído para {FileId}", file.Id);

                // Retorna o link direto para visualização
                return $"https://drive.google.com/uc?export=view&id={file.Id}";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro fatal durante o processo de upload para o Google Drive");
                throw;
            }
        }
    }
}
