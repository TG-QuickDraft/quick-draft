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
        public async Task<IActionResult> Consultar(
            [FromQuery] FiltroServicoDTO filtro,
            [FromQuery] int pagina,
            [FromQuery] int tamanhoPagina
        )
        {
            return Ok(await _service.ConsultarTodosAsync(filtro, pagina, tamanhoPagina));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ConsultarPorId(int id)
        {
            return Ok(await _service.ConsultarPorIdAsync(id));
        }

        [HttpPost]
        [Authorize(Roles = Roles.Cliente)]
        public async Task<IActionResult> Adicionar([FromBody] CriarServicoDTO servico)
        {
            int usuarioId = User.GetUserId();

            ServicoDTO novoServico = await _service.CriarAsync(servico, usuarioId);

            return CreatedAtAction(
                nameof(ConsultarPorId),
                new { id = novoServico.Id },
                novoServico
            );
        }

        [HttpPost("{servicoId}/aceitar-proposta/{propostaId}")]
        [Authorize(Roles = Roles.Cliente)]
        public async Task<IActionResult> AceitarProposta(int servicoId, int propostaId)
        {
            int clienteId = User.GetUserId();

            bool result = await _service.AceitarPropostaAsync(servicoId, propostaId, clienteId);

            if (!result)
                return BadRequest("Não foi possível aceitar a proposta");

            return NoContent();
        }

        [HttpGet("meus-servicos")]
        [Authorize(Roles = Roles.Cliente)]
        public async Task<IActionResult> MeusServicos(
            [FromQuery] int pagina = 1,
            [FromQuery] int tamanhoPagina = 30
        )
        {
            int clienteId = User.GetUserId();

            var result = await _service.ConsultarPorClienteAsync(clienteId, pagina, tamanhoPagina);

            return Ok(result);
        }

        [HttpGet("cliente/{clienteId}")]
        public async Task<IActionResult> ConsultarPorClienteId(
            int clienteId,
            [FromQuery] int pagina = 1,
            [FromQuery] int tamanhoPagina = 30
        )
        {
            var result = await _service.ConsultarPorClienteAsync(clienteId, pagina, tamanhoPagina);

            return Ok(result);
        }
    }
}
