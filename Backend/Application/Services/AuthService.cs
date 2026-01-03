using Backend.Application.Interfaces.Infrastructure;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Application.Utils;

namespace Backend.Application.Services
{
    public class AuthService(
        IUsuarioService usuarioService,
        IUsuarioRepository repo,
        ITokenService tokenService) : IAuthService
    {   
        private readonly IUsuarioService _usuarioService = usuarioService;
        private readonly IUsuarioRepository _repo = repo;
        private readonly ITokenService _tokenService = tokenService;

        public async Task<string> LoginAsync(string email, string senha)
        {
            var usuario = await _repo.ConsultarPorEmailAsync(email);

            if (usuario is null)
                throw new UnauthorizedAccessException();

            var senhaValida = PasswordHasherUtil
                .Verify(usuario.HashSenha, senha);
                
            if (!senhaValida)
                throw new UnauthorizedAccessException();

            var tipoUsuario = await _usuarioService.ObterTipoUsuario(usuario.Id);

            return _tokenService.GenerateToken(usuario.Id, usuario.Email, tipoUsuario);
        }
    }
}