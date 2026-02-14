using Backend.API.Authorization;
using Backend.API.Extensions;
using Backend.Application.DTOs.ContaBancaria;
using Backend.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ContaBancariaController(IContaBancariaService service) : ControllerBase
    {
        private readonly IContaBancariaService _service = service;

        [HttpGet]
        [Authorize(Roles = Roles.Freelancer)]
        public async Task<IActionResult> Consultar()
        {
            return Ok(
                await _service.ConsultarPorIdFreelancerAsync(User.GetUserId())
            );
        }

        [HttpGet("tipoConta")]
        public async Task<IActionResult> ConsultarTiposConta()
        {
            return Ok(
                await _service.ConsultarTiposConta()
            );
        }

        [HttpPost]
        [Authorize(Roles = Roles.Freelancer)]
        public async Task<IActionResult> Adicionar([FromBody] CriarContaBancariaDTO conta)
        {
            ContaBancariaDTO novaConta = await _service.CriarAsync(conta, User.GetUserId());

            return CreatedAtAction(
                nameof(Consultar), new { id = novaConta.Id }, novaConta
            );
        }

        [HttpPut]
        [Authorize(Roles = Roles.Freelancer)]
        public async Task<IActionResult> Atualizar([FromBody] ContaBancariaDTO conta)
        {
            return Ok(
                await _service.AtualizarAsync(conta, User.GetUserId())
            );
        }

    }
}