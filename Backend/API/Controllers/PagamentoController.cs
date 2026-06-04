using Backend.API.Authorization;
using Backend.API.Extensions;
using Backend.Application.DTOs.Pagamento;
using Backend.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class PagamentoController(IPagamentoService service) : ControllerBase
    {
        private readonly IPagamentoService _service = service;

        [HttpGet]
        public async Task<IActionResult> GetTaxa()
        {
            return Ok(await _service.ObterTaxaAsync());
        }

        [HttpPost]
        [Authorize(Roles = Roles.Cliente)]
        public async Task<IActionResult> Pagar([FromBody] CriarPagamentoDTO dto)
        {
            int clienteId = User.GetUserId();

            bool result = await _service.RealizarPagamentoAsync(dto, clienteId);

            if (!result)
                return BadRequest("Não foi possível realizar o pagamento");

            return Ok("Pagamento realizado com sucesso");
        }
    }
}