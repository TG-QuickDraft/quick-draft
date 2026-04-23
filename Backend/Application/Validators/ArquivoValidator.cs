namespace Backend.Application.Validators
{
    public class ArquivoValidator
    {
        private const int TAMANHO_MAXIMO_MB = 5;
        private const long TAMANHO_MAXIMO_BYTES = TAMANHO_MAXIMO_MB * 1024 * 1024;

        private readonly string[] EXTENSOES_IMAGEM_PERMITIDAS = [
            ".jpg",
            ".jpeg",
            ".png",
            ".webp"
        ];

        public void ValidarArquivo(IFormFile arquivo)
        {
            if (arquivo.Length > TAMANHO_MAXIMO_BYTES)
            {
                throw new Exception($"Arquivo excede {TAMANHO_MAXIMO_MB}MB.");
            }
        }

        public void ValidarImagem(IFormFile imagem)
        {
            var extensao = Path.GetExtension(imagem.FileName).ToLower();

            if (!EXTENSOES_IMAGEM_PERMITIDAS.Contains(extensao))
                throw new Exception("Formato de imagem inválido.");

            if (imagem.Length > TAMANHO_MAXIMO_BYTES)
            {
                throw new Exception($"Imagem excede {TAMANHO_MAXIMO_MB}MB.");
            }
        }
    }
}