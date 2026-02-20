using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Backend.API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static int GetUserId(this ClaimsPrincipal user)
        {
            var sub = user.FindFirstValue(JwtRegisteredClaimNames.Sub);

            if (!int.TryParse(sub, out var userId) || userId < -1)
                throw new UnauthorizedAccessException("Usuário inválido.");

            return userId;
        }
    }
    
}
