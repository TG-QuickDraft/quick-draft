using Backend.API.Authorization;
using Backend.API.Extensions;
using Backend.Application.DTOs.CartaoCredito;
using Backend.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CartaoCreditoController(ICartaoCreditoService service) : ControllerBase
    {
        private readonly ICartaoCreditoService _service = service;

        [HttpGet]
        [Authorize(Roles = Roles.Cliente)]
        public async Task<IActionResult> Consultar()
        {
            return Ok(
                await _service.ConsultarPorIdClienteAsync(User.GetUserId())
            );
        }

        [HttpGet("bandeiras")]
        public async Task<IActionResult> ConsultarBandeiras()
        {
            return Ok(
                await _service.ConsultarBandeirasAsync()
            );
        }

        [HttpPost]
        [Authorize(Roles = Roles.Cliente)]
        public async Task<IActionResult> Adicionar([FromBody] CriarCartaoCreditoDTO dto)
        {
            CartaoCreditoDTO novoCartao = await _service.CriarAsync(
                dto, User.GetUserId()
            );

            return CreatedAtAction(
                nameof(Consultar),
                new { id = novoCartao.Id },
                novoCartao
            );
        }

        [HttpPut]
        [Authorize(Roles = Roles.Cliente)]
        public async Task<IActionResult> Atualizar([FromBody] CartaoCreditoDTO dto)
        {
            return Ok(
                await _service.AtualizarAsync(dto, User.GetUserId())
            );
        }

    }
}