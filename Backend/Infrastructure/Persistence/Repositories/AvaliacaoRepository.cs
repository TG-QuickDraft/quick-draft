using Backend.Application.Interfaces.Repositories;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Persistence.Repositories
{
    public class AvaliacaoRepository(AppDbContext context) : IAvaliacaoRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<Avaliacao?> ConsultarPorServicoIdEAutorIdAsync(int servicoId, int autorId)
        {
            return await _context.Avaliacoes
                .FirstOrDefaultAsync(a => a.ServicoId == servicoId && a.AutorId == autorId);
        }

        public async Task<Avaliacao?> CriarAsync(Avaliacao avaliacao)
        {
            _context.Avaliacoes.Add(avaliacao);
            await _context.SaveChangesAsync();
            return avaliacao;
        }
    }
}