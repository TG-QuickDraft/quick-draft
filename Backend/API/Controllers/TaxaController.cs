using Backend.Domain.Constants;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaxaController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetTaxa()
        {
            return Ok(new { taxa = Taxa.TAXA });
        }
    }
}
