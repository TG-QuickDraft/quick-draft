using Backend.Application.DTOs.Cliente;
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

    }
}