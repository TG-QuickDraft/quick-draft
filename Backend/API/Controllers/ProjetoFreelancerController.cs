using Backend.API.Authorization;
using Backend.API.Extensions;
using Backend.Application.DTOs.ProjetoFreelancer;
using Backend.Application.DTOs.Upload;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> ConsultarPorId(int id)
        {
            var projetos = await _service.ConsultarPorIdAsync(id);
            return Ok(projetos);
        }

        [HttpGet("freelancer/{freelancerId}")]
        public async Task<IActionResult> ConsultarPorIdFreelancer(int freelancerId)
        {
            var projetos = await _service.ConsultarPorIdFreelancerAsync(freelancerId);
            return Ok(projetos);
        }

        [HttpPost]
        [Authorize(Roles = Roles.Freelancer)]
        public async Task<IActionResult> AdicionarProjetoFreelancer(
            [FromBody] CriarProjetoFreelancerDTO dto
        )
        {
            int freelancerId = User.GetUserId();

            var projeto = await _service.CriarAsync(dto, freelancerId);

            return CreatedAtAction(nameof(ConsultarPorId), new { id = projeto.Id }, projeto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = Roles.Freelancer)]
        public async Task<IActionResult> AtualizarProjetoFreelancer(
            int id,
            [FromBody] AtualizarProjetoFreelancerDTO dto
        )
        {
            int freelancerId = User.GetUserId();
            var result = await _service.AtualizarProjetoAsync(dto, id, freelancerId);
            return result == null
                ? NotFound("Projeto do freelancer não encontrado ou não pertence ao usuário.")
                : Ok(result);
        }

        [HttpPost("upload-foto/{projetoId}")]
        [Authorize(Roles = Roles.Freelancer)]
        public async Task<IActionResult> UploadFoto([FromForm] UploadImagemDTO dto, int projetoId)
        {
            if (dto.Imagem == null || dto.Imagem.Length == 0)
                return BadRequest("Nenhuma imagem enviada.");

            int freelancerId = User.GetUserId();

            bool resultado = await _service.AtualizarImagemAsync(dto, freelancerId, projetoId);

            return resultado == false
                ? NotFound("Projeto do freelancer não encontrado.")
                : Ok(new { mensagem = "Upload concluído!" });
        }
    }
}
