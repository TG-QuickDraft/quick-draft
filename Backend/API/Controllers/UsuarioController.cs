
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Backend.API.Extensions;
using Backend.Application.DTOs.Login;
using Backend.Application.DTOs.Upload;
using Backend.Application.DTOs.Usuario;
using Backend.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class UsuarioController(IUsuarioService service) : ControllerBase
    {
        readonly IUsuarioService _service = service;

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> ConsultarPorId()
        {
            int usuarioId = User.GetUserId();

            var usuario = await _service.ConsultarPorIdAsync(usuarioId);
            return Ok(usuario);
        }

        [HttpPost]
        public async Task<IActionResult> Adicionar([FromBody] CriarUsuarioDTO usuario)
        {
            UsuarioDTO novoUsuario = await _service.CriarAsync(usuario);

            return CreatedAtAction(nameof(ConsultarPorId), new { id = novoUsuario.Id }, novoUsuario);
        }

        [HttpPost("upload-foto")]
        [Authorize]
        public async Task<IActionResult> UploadFoto([FromForm] UploadImagemDTO dto)
        {
            if (dto.Imagem == null || dto.Imagem.Length == 0)
                return BadRequest("Nenhuma imagem enviada.");

            var usuarioId = User.GetUserId();

            bool resultado = await _service.AtualizarFotoAsync(dto, usuarioId);

            return
                resultado == false ? NotFound("Usuário não encontrado.") :
                Ok(new { mensagem = "Upload concluído!" });
        }


        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Deletar(int id)
        {
            bool usuario = await _service.DeletarAsync(id);

            if (!usuario)
            {
                return BadRequest("Usuário não deletado.");
            }

            return NoContent();
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            var email = User.FindFirstValue(JwtRegisteredClaimNames.Email);
            var roles = User.
                FindAll("roles").
                Select(r => r.Value).
                ToList();

            return Ok(new MeResponseDTO { 
                Email = email!,
                Roles = roles!
            });
        }

    }
}