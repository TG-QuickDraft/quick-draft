using Backend.API.Authorization;
using Backend.API.Extensions;
using Backend.Application.DTOs.Servico;
using Backend.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{

    [ApiController]
    [Route("/api/[controller]")]
    public class ServicoController(IServicoService service) : ControllerBase
    {
        private readonly IServicoService _service = service;

        [HttpGet]
        public async Task<IActionResult> Consultar([FromQuery] string? nome)
        {
            FiltroServicoDTO filtro = new()
            {
                Nome = nome
            };

            return Ok(
                await _service.ConsultarTodosAsync(filtro)
            );
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ConsultarPorId(int id)
        {
            return Ok(
                await _service.ConsultarPorIdAsync(id)
            );
        }

        [HttpPost]
        [Authorize(Roles = Roles.Cliente)]
        public async Task<IActionResult> Adicionar([FromBody] CriarServicoDTO servico)
        {
            int usuarioId = User.GetUserId();

            ServicoDTO novoServico = await _service.CriarAsync(servico, usuarioId);

            return CreatedAtAction(nameof(ConsultarPorId), new { id = novoServico.Id }, novoServico);
        }

        [HttpPut]
        [Authorize(Roles = Roles.Cliente)]
        public async Task<IActionResult> Atualizar([FromBody] AtualizarServicoDTO servico)
        {
            int clienteId = User.GetUserId();
            bool isAtualizado = await _service.AtualizarAsync(servico, clienteId);

            if (!isAtualizado)
            {
                return BadRequest("Serviço não atualizado.");
            }

            return NoContent();
        }

    }
}