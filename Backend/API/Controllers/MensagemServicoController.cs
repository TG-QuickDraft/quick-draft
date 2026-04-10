using Backend.API.Extensions;
using Backend.Application.DTOs.Mensagem;
using Backend.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MensagemServicoController(IMensagemServicoService service) : ControllerBase
    {
        private readonly IMensagemServicoService _service = service;

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> EnviarMensagem([FromBody] EnviarMensagemDTO dto)
        {
            int usuarioId = User.GetUserId();
            return Ok(await _service.EnviarMensagemAsync(dto, usuarioId));
        }

        [HttpGet("servico/{servicoId}")]
        [Authorize]
        public async Task<IActionResult> ObterHistorico(int servicoId)
        {
            int usuarioId = User.GetUserId();

            var result = await _service.ObterHistoricoAsync(servicoId, usuarioId);

            return Ok(result);
        }
    }
}
