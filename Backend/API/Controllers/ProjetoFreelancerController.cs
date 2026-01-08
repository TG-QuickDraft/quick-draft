using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Backend.Application.DTOs.ProjetoFreelancer;
using Backend.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{

    [ApiController]
    [Route("/api/[controller]")]
    public class ProjetoFreelancerController(IProjetoFreelancerService service) : ControllerBase
    {
        private readonly IProjetoFreelancerService _service = service;

        [HttpGet("{freelancerId}")]
        public async Task<IActionResult> ConsultarPorIdFreelancer(int freelancerId)
        {
            var projetos = await _service.ConsultarPorIdFreelancerAsync(freelancerId);
            return Ok(projetos);
        }

        [HttpPost]
        [Authorize(Roles = "Freelancer")]
        public async Task<IActionResult> AdicionarProjetoFreelancer(
            [FromBody] CriarProjetoFreelancerDTO dto
        )
        {
            var sub = User.FindFirstValue(JwtRegisteredClaimNames.Sub);

            if (!int.TryParse(sub, out var freelancerId) || freelancerId <= 0)
            {
                return Unauthorized("Usuário inválido.");
            }

            var projeto = await _service.CriarAsync(dto, freelancerId);

            return Ok(projeto);
        }

        [HttpPost("upload-foto/{projetoId}")]
        [Authorize(Roles = "Freelancer")]
        public async Task<IActionResult> UploadFoto(
            [FromForm] ImagemProjetoFreelancerUploadDTO dto,
            int projetoId
        )
        {
            if (dto.Imagem == null || dto.Imagem.Length == 0)
                return BadRequest("Nenhuma imagem enviada.");

            var sub = User.FindFirstValue(JwtRegisteredClaimNames.Sub);

            if (!int.TryParse(sub, out var freelancerId) || freelancerId <= 0)
            {
                return Unauthorized("Usuário inválido.");
            }

            bool resultado = await _service.AtualizarImagemAsync(dto, freelancerId, projetoId);

            return
                resultado == false ? NotFound("Projeto do freelancer não encontrado.") :
                Ok(new { mensagem = "Upload concluído!" });
        }

    }
}