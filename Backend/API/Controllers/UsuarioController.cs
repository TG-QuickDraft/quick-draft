
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Backend.Application.DTOs;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> ConsultarPorId(int id)
        {
            var usuario = await _service.ConsultarPorIdAsync(id);
            return Ok(usuario);
        }

        [HttpPost]
        public async Task<IActionResult> Adicionar([FromBody] CriarUsuarioDTO usuario)
        {
            UsuarioDTO novoUsuario = await _service.CriarAsync(usuario);

            return CreatedAtAction(nameof(ConsultarPorId), new { id = novoUsuario.Id }, novoUsuario);
        }

        [HttpPost("upload-foto")]
        public async Task<IActionResult> UploadFoto([FromForm] PerfilUploadDTO dto)
        {
            if (dto.FotoPerfil == null || dto.FotoPerfil.Length == 0)
                return BadRequest("Nenhuma imagem enviada.");

            bool resultado = await _service.AtualizarFotoAsync(dto);

            return
                resultado == false ? NotFound("Usuário não encontrado.") :
                Ok(new { mensagem = "Upload concluído!" });
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletar(int id)
        {
            bool freelancerDeletado = await _service.DeletarAsync(id);

            if (!freelancerDeletado)
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