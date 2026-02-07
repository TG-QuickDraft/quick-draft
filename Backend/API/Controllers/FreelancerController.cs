using Backend.API.Authorization;
using Backend.API.Extensions;
using Backend.Application.DTOs.Freelancer;
using Backend.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{

    [ApiController]
    [Route("/api/[controller]")]
    public class FreelancerController(IFreelancerService service) : ControllerBase
    {
        private readonly IFreelancerService _service = service;

        [HttpGet]
        public async Task<IActionResult> Consultar([FromQuery] string? nome)
        {
            return Ok(
                await _service.ConsultarTodosAsync(nome ?? null)
            );
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ConsultarPorId(int id)
        {
            var freelancer = await _service.ConsultarPorIdAsync(id);
            return Ok(freelancer);
        }

        [HttpPut]
        [Authorize(Roles = Roles.Freelancer)]
        public async Task<IActionResult> Atualizar([FromBody] AtualizarFreelancerDTO freelancer)
        {
            int freelancerId = User.GetUserId();

            bool isAtualizado = await _service.AtualizarAsync(freelancer, freelancerId);

            if (!isAtualizado)
            {
                return BadRequest("Freelancer não atualizado.");
            }

            return NoContent();
        }

    }
}