using Backend.API.Authorization;
using Backend.API.Extensions;
using Backend.Application.DTOs.Entrega;
using Backend.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class EntregaController(IEntregaService service) : ControllerBase
    {
        private readonly IEntregaService _service = service;

        [HttpGet("servico/{servicoId}")]
        [Authorize(Roles = $"{Roles.Cliente},{Roles.Freelancer}")]
        public async Task<IActionResult> ConsultarPorIdServico(int servicoId)
        {
            int usuarioId = User.GetUserId();

            EntregaDTO? entrega = await _service.ConsultarPorIdServicoAsync(servicoId, usuarioId);

            if (entrega == null)
            {
                return NoContent();
            }

            return Ok(entrega);
        }

        [HttpPost]
        [Authorize(Roles = Roles.Freelancer)]
        public async Task<IActionResult> Adicionar([FromForm] RealizarEntregaDTO entrega)
        {
            int freelancerId = User.GetUserId();

            EntregaDTO novaEntrega = await _service.RealizarEntregaAsync(entrega, freelancerId);

            return CreatedAtAction(
                nameof(ConsultarPorIdServico), new { servicoId = novaEntrega.ServicoId }, novaEntrega
            );
        }

    }
}