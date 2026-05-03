using Backend.Application.DTOs.Servico;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Pagination;
using Backend.Application.Pagination.Extensions;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Persistence.Repositories
{
    public class ServicoRepository(AppDbContext context, IPropostaRepository propostaRepository) : IServicoRepository
    {
        private readonly AppDbContext _context = context;
        private readonly IPropostaRepository _propostaRepository = propostaRepository;

        public async Task<Servico?> ConsultarPorIdAsync(int id)
        {
            return await _context.Servicos.FindAsync(id);
        }

        public async Task<PagedResult<Servico>> ConsultarTodosAsync(
            FiltroServicoDTO filtro,
            int pagina,
            int tamanhoPagina
        )
        {
            var query = _context.Servicos.Where(s =>
                EF.Functions.ILike(s.Nome ?? "", $"%{filtro.Nome}%")
            );

            if (filtro.IsEntregue.HasValue)
            {
                query = query.Where(s => s.IsEntregue == filtro.IsEntregue.Value);
            }

            if (filtro.OrcamentoIsAberto.HasValue)
            {
                query = query.Where(s => s.OrcamentoIsAberto == filtro.OrcamentoIsAberto.Value);
            }

            if (filtro.PrazoMaximo.HasValue)
            {
                query = query.Where(s => s.Prazo <= filtro.PrazoMaximo.Value);
            }

            if (filtro.ValorMinimo.HasValue)
            {
                query = query.Where(s => s.ValorMinimo >= filtro.ValorMinimo.Value);
            }

            return await query.OrderBy(s => s.Nome).ToPagedResultAsync(pagina, tamanhoPagina);
        }

        public async Task<Servico> CriarAsync(Servico servico)
        {
            _context.Servicos.Add(servico);
            await _context.SaveChangesAsync();
            return servico;
        }

        public async Task<bool> AtualizarAsync(Servico servico)
        {
            var existente = await _context.Servicos.FindAsync(servico.Id);
            if (existente == null)
                return false;

            _context.Entry(existente).CurrentValues.SetValues(servico);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<PagedResult<Servico>> ConsultarPorClienteAsync(
            int clienteId,
            int pagina,
            int tamanhoPagina
        )
        {
            var query = _context.Servicos
                .Where(s => s.ClienteId == clienteId)
                .OrderByDescending(s => s.Id);

            return await query.ToPagedResultAsync(pagina, tamanhoPagina);
        }

        public async Task<Proposta?> ConsultarPropostaAceitaIdAsync(int servicoId)
        {
            var propostaAceitaId = await _context.Servicos
                .Where(s => s.Id == servicoId)
                .Select(s => s.PropostaAceitaId)
                .SingleOrDefaultAsync();

            if (propostaAceitaId is null)
                return null;

            return await _propostaRepository
                .ConsultarPorIdAsync(propostaAceitaId.Value);
        }

        public async Task<bool> AtualizarIsEntregue(int servicoId, bool isEntregue)
        {
            var existente = await _context.Servicos.FindAsync(servicoId);
            if (existente == null)
                return false;

            existente.IsEntregue = isEntregue;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Servico?> ConsultarPorIdComPropostaAsync(int id)
        {
            return await _context.Servicos
                .Include(s => s.PropostaAceita)
                .FirstOrDefaultAsync(s => s.Id == id);
        }
    }
}
