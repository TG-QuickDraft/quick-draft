using Backend.API.Authorization;
using Backend.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AnaliseController(IAnaliseService service) : ControllerBase
    {
        private readonly IAnaliseService _service = service;

        [HttpGet]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> GetAnaliseData([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            return Ok(await _service.GetAnaliseDataAsync(startDate, endDate));
        }
    }
}
