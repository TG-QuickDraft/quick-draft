using Backend.Models;
using Backend.Services;

using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [ApiController]
    [Route("/api/[controller]")]
    public class FreelancerController(IFreelancerService service) : ControllerBase
    {
        private readonly IFreelancerService _service = service;

        [HttpGet]
        public async Task<IActionResult> Consultar()
        {
            IEnumerable<Freelancer> freelancers = await _service.ConsultarTodosAsync();

            return Ok(freelancers); ;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ConsultarPorId(int id)
        {
            var freelancer = await _service.ConsultarPorIdAsync(id);
            return Ok(freelancer);
        }

        [HttpPost]
        public async Task<IActionResult> Adicionar([FromBody] Freelancer freelancer)
        {
            Freelancer novoFreelancer = await _service.CriarAsync(freelancer);

            return CreatedAtAction(nameof(ConsultarPorId), new { id = novoFreelancer.Id }, novoFreelancer);
        }

        [HttpPut]
        public async Task<IActionResult> Atualizar([FromBody] Freelancer freelancer)
        {
            bool isAtualizado = await _service.AtualizarAsync(freelancer);

            if (!isAtualizado)
            {
                return BadRequest("Freelancer não atualizado.");
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletar(int id)
        {
            bool freelancerDeletado = await _service.DeletarAsync(id);

            if (!freelancerDeletado)
            {
                return BadRequest("Freelancer não deletado.");
            }

            return NoContent();
        }
    }
}