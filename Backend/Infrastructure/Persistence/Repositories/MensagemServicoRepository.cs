using Backend.Application.Interfaces.Repositories;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Backend.Infrastructure.Persistence;

namespace Backend.Infrastructure.Persistence.Repositories
{
    public class MensagemServicoRepository(AppDbContext context) : IMensagemServicoRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<MensagemServico> CriarAsync(MensagemServico mensagem)
        {
            await _context.MensagensServico.AddAsync(mensagem);
            await _context.SaveChangesAsync();
            return mensagem;
        }
   
        public async Task<IEnumerable<MensagemServico>> ConsultarPorServicoIdAsync(int servicoId)
        {
            return await _context.MensagensServico
                .Where(m => m.ServicoId == servicoId)
                .OrderBy(m => m.Data)
                .ToListAsync();
        }
    }
}