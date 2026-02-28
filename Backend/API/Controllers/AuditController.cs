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
    public class AuditController(IAuditService service) : ControllerBase
    {
        private readonly IAuditService _service = service;

        [HttpGet]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> Consultar()
        {
            return Ok(
                await _service.ConsultarAsync()
            );
        }

    }
}