using Backend.API.Extensions;
using Backend.API.Hubs;
using Backend.Application.DTOs.Mensagem;
using Backend.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Backend.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MensagemServicoController(
        IMensagemServicoService service,
        IHubContext<ChatHub> hubContext
    ) : ControllerBase
    {
        private readonly IMensagemServicoService _service = service;
        private readonly IHubContext<ChatHub> _hubContext = hubContext;

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> EnviarMensagem([FromBody] EnviarMensagemDTO dto)
        {
            int usuarioId = User.GetUserId();

            var result = await _service.EnviarMensagemAsync(dto, usuarioId);

            await _hubContext
                .Clients.Group(dto.ServicoId.ToString())
                .SendAsync("ReceiveMessage", result);

            return Ok(result);
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
