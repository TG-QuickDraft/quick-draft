using Backend.API.Authorization;
using Backend.API.Extensions;
using Backend.Application.DTOs.Avaliacao;
using Backend.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{

    [ApiController]
    [Route("/api/[controller]")]
    public class AvaliacaoController(IAvaliacaoService service) : ControllerBase
    {
        private readonly IAvaliacaoService _service = service;

        [HttpPost]
        [Authorize(Roles = Roles.Cliente + "," + Roles.Freelancer)]
        public async Task<IActionResult> CriarAvaliacao(CriarAvaliacaoDTO dto)
        {
            var avaliacao = await _service.CriarAsync(dto, User.GetUserId());
            return Ok(avaliacao);
        }

    }
}