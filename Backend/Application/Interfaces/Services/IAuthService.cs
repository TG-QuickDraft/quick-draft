using Backend.Application.DTOs.Login;

namespace Backend.Application.Interfaces.Services
{
    public interface IAuthService
    {
        public Task<string> LoginAsync(LoginDTO login);
    }
}