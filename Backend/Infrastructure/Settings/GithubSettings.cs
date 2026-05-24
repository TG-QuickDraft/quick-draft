namespace Backend.Infrastructure.Settings
{
    public class GithubSettings
    {
        public string Token { get; set; } = string.Empty;
        public string Owner { get; set; } = string.Empty;
        public string Repository { get; set; } = string.Empty;
        public string Branch { get; set; } = "main";
    }
}
