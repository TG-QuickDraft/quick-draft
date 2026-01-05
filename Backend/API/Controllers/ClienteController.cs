using Backend.Application.DTOs;
using Backend.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{

    [ApiController]
    [Route("/api/[controller]")]
    public class ClienteController(IClienteService service) : ControllerBase
    {
        private readonly IClienteService _service = service;

        [HttpGet]
        public async Task<IActionResult> Consultar()
        {
            IEnumerable<ClienteDTO> clientes = await _service.ConsultarTodosAsync();

            return Ok(clientes); ;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ConsultarPorId(int id)
        {
            var servico = await _service.ConsultarPorIdAsync(id);
            return Ok(servico);
        }
        
        // TODO: DTO para atualizar cliente
        [HttpPut]
        public async Task<IActionResult> Atualizar([FromBody] ClienteDTO cliente)
        {
            bool isAtualizado = await _service.AtualizarAsync(cliente);

            if (!isAtualizado)
            {
                return BadRequest("Cliente não atualizado.");
            }

            return NoContent();
        }

    }
}