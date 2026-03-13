namespace Backend.Application.Validators
{
    public class ImagemValidator
    {
        private const int TAMANHO_MAXIMO_MB = 5;
        private const long TAMANHO_MAXIMO_BYTES = TAMANHO_MAXIMO_MB * 1024 * 1024;

        private readonly string[] ExtensoesPermitidas = [
            ".jpg",
            ".jpeg",
            ".png",
            ".webp"
        ];

        public void Validar(IFormFile arquivo)
        {
            var extensao = Path.GetExtension(arquivo.FileName).ToLower();

            if (!ExtensoesPermitidas.Contains(extensao))
                throw new Exception("Formato de imagem inválido.");

            if (arquivo.Length > TAMANHO_MAXIMO_BYTES)
            {
                throw new Exception($"Imagem excede {TAMANHO_MAXIMO_MB}MB.");
            }
        }
    }
}