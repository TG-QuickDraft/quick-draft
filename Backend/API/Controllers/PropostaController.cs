using Backend.API.Authorization;
using Backend.API.Extensions;
using Backend.Application.DTOs.Proposta;
using Backend.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{

    [ApiController]
    [Route("/api/[controller]")]
    public class PropostaController(IPropostaService service) : ControllerBase
    {
        private readonly IPropostaService _service = service;

        [HttpGet("{id}")]
        public async Task<IActionResult> ConsultarPorId(int id)
        {
            return Ok(
                await _service.ConsultarPorIdAsync(id)
            );
        }

        [HttpGet("servico/{servicoId}")]
        public async Task<IActionResult> ConsultarPorServicoId(int servicoId)
        {
            return Ok(
                await _service.ConsultarPorIdServicoAsync(servicoId)
            );
        }

        [HttpGet("freelancer/{freelancerId}")]
        public async Task<IActionResult> ConsultarPorFreelancerId(int freelancerId)
        {
            return Ok(
                await _service.ConsultarPorIdFreelancerAsync(freelancerId)
            );
        }

        [HttpPost]
        [Authorize(Roles = Roles.Freelancer)]
        public async Task<IActionResult> CriarProposta([FromBody] CriarPropostaDTO dto)
        {
            int freelancerId = User.GetUserId();
            var proposta = await _service.CriarAsync(dto, freelancerId);

            return CreatedAtAction(
                nameof(ConsultarPorId),
                new { id = proposta.Id },
                proposta
            );
        }

    }
}