using Backend.Application.Interfaces.Repositories;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Persistence.Repositories
{
    public class CartaoCreditoRepository(AppDbContext context) : ICartaoCreditoRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<CartaoCredito?> ConsultarPorIdClienteAsync(int clienteId)
        {
            return await _context.CartoesCredito
                .Where(c => c.Id == clienteId)
                .Include(c => c.Bandeira)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<BandeiraCartaoCredito>> ConsultarBandeirasAsync()
        {
            return await _context.BandeirasCartaoCredito
                .ToListAsync();
        }

        public async Task<CartaoCredito> CriarAsync(CartaoCredito cartao)
        {
            _context.CartoesCredito.Add(cartao);
            await _context.SaveChangesAsync();
            return cartao;
        }

        public async Task<CartaoCredito> AtualizarAsync(CartaoCredito cartao)
        {
            CartaoCredito? cartaoSalvo =
                await ConsultarPorIdClienteAsync(cartao.Id)
                    ?? throw new Exception("Cartão de crédito não encontrado!");

            cartaoSalvo.NomeImpresso = cartao.NomeImpresso;
            cartaoSalvo.CodigoSeguranca = cartao.CodigoSeguranca;
            cartaoSalvo.BandeiraId = cartao.BandeiraId;
            
            await _context.SaveChangesAsync();

            return cartaoSalvo;
        }
    }
}