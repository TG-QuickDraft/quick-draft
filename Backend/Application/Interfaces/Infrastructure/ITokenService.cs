namespace Backend.Application.Interfaces.Infrastructure
{
    public interface ITokenService
    {
        string GenerateToken(int usuarioId, string email);
    }
}