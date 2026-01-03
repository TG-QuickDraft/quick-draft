namespace Backend.Application.Interfaces.Services
{
    public interface IAuthService
    {
        public Task<string> LoginAsync(string email, string senha);
    }
}