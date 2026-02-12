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

        [HttpGet("{id}")]
        public async Task<IActionResult> ConsultarPorId(int id)
        {
            return Ok(
                await _service.ConsultarPorIdAsync(id)
            );
        }

        [HttpGet("freelancer/{id}")]
        public async Task<IActionResult> ConsultarPorIdFreelancer(int freelancerId)
        {
            return Ok(
                await _service.ConsultarPorIdAsync(freelancerId)
            );
        }

        [HttpPost]
        [Authorize(Roles = Roles.Freelancer)]
        public async Task<IActionResult> Adicionar([FromBody] CriarContaBancariaDTO conta)
        {
            ContaBancariaDTO novaConta = await _service.CriarAsync(conta, User.GetUserId());

            return CreatedAtAction(
                nameof(ConsultarPorId), new { id = novaConta.Id }, novaConta
            );
        }

    }
}