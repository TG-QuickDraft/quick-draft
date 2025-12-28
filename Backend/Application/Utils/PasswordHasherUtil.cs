using Microsoft.AspNetCore.Identity;

namespace Backend.Application.Utils
{
    public static class PasswordHasherUtil
    {
        private static readonly PasswordHasher<string> _hasher = new();

        public static string Hash(string senha)
            => _hasher.HashPassword(null!, senha);

        public static bool Verify(string hash, string senha)
            => _hasher.VerifyHashedPassword(null!, hash, senha)
               == PasswordVerificationResult.Success;
    }
}