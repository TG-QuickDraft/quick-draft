using Backend.Application.DTOs.Login;
using Backend.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IAuthService service) : ControllerBase
    {
        private readonly IAuthService _service = service;

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            try
            {
                var token = await _service.LoginAsync(dto);

                return Ok(new { token });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Email ou senha inválidos");
            }
        }
    }
}