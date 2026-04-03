using Microsoft.AspNetCore.Authorization;
using Backend.API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Backend.Application.Interfaces.Services;

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

        await _service.EnviarMensagemAsync(dto, usuarioId);

        return Ok();
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