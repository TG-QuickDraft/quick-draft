using Backend.Application.Interfaces.Infrastructure;
using Backend.Infrastructure.Settings;
using Microsoft.Extensions.Options;

namespace Backend.Infrastructure.Url
{
    public class UrlBuilder(IOptions<ImageSettings> options) : IUrlBuilder
    {
        private readonly ImageSettings _settings = options.Value;

        public string ConstruirUrl(string? path)
        {
            if (string.IsNullOrEmpty(path))
                return "";

            return $"{_settings.BaseUrl}/{path}";
        }
    }
}
