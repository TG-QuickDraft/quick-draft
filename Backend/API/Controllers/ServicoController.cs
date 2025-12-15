using Backend.Application.DTOs;
using Backend.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{

    [ApiController]
    [Route("/api/[controller]")]
    public class ServicoController(IServicoService service) : ControllerBase
    {
        private readonly IServicoService _service = service;

        [HttpGet]
        public async Task<IActionResult> Consultar()
        {
            IEnumerable<ServicoDTO> servicos = await _service.ConsultarTodosAsync();

            return Ok(servicos); ;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ConsultarPorId(int id)
        {
            var servico = await _service.ConsultarPorIdAsync(id);
            return Ok(servico);
        }

        [HttpPost]
        public async Task<IActionResult> Adicionar([FromBody] ServicoDTO servico)
        {
            ServicoDTO novoServico = await _service.CriarAsync(servico);

            return CreatedAtAction(nameof(ConsultarPorId), new { id = novoServico.Id }, novoServico);
        }

        [HttpPut]
        public async Task<IActionResult> Atualizar([FromBody] ServicoDTO servico)
        {
            bool isAtualizado = await _service.AtualizarAsync(servico);

            if (!isAtualizado)
            {
                return BadRequest("Serviço não atualizado.");
            }

            return NoContent();
        }

    }
}