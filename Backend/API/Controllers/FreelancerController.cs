using Backend.Application.DTOs;
using Backend.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{

    [ApiController]
    [Route("/api/[controller]")]
    public class FreelancerController(IFreelancerService service) : ControllerBase
    {
        private readonly IFreelancerService _service = service;

        [HttpGet]
        public async Task<IActionResult> Consultar()
        {
            IEnumerable<FreelancerDTO> freelancers = await _service.ConsultarTodosAsync();

            return Ok(freelancers); ;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ConsultarPorId(int id)
        {
            var freelancer = await _service.ConsultarPorIdAsync(id);
            return Ok(freelancer);
        }

        [HttpPost]
        public async Task<IActionResult> Adicionar([FromBody] FreelancerDTO freelancer)
        {
            FreelancerDTO novoFreelancer = await _service.CriarAsync(freelancer);

            return CreatedAtAction(nameof(ConsultarPorId), new { id = novoFreelancer.Id }, novoFreelancer);
        }

        [HttpPut]
        public async Task<IActionResult> Atualizar([FromBody] FreelancerDTO freelancer)
        {
            bool isAtualizado = await _service.AtualizarAsync(freelancer);

            if (!isAtualizado)
            {
                return BadRequest("Freelancer não atualizado.");
            }

            return NoContent();
        }

    }
}