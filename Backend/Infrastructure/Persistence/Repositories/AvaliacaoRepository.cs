using Backend.Application.DTOs.Avaliacao;
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

        public async Task<AvaliacaoPerfilDTO> ConsultarAvaliacaoPerfilAsync(int usuarioId)
        {
            var avaliacoes = await _context.Avaliacoes
                .Where(a => a.AlvoId == usuarioId)
                .ToListAsync();

            return new AvaliacaoPerfilDTO
            {
                MediaAvaliacoes = avaliacoes.Any() ? avaliacoes.Average(a => a.NotaEstrelas) : 0,
                TotalAvaliacoes = avaliacoes.Count
            };
        }
    }
}