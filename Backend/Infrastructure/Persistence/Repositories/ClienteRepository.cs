using Backend.Domain.Entities;
using Backend.Application.Interfaces.Repositories;

using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Persistence.Repositories
{
    public class ClienteRepository(AppDbContext context) : IClienteRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<IEnumerable<Cliente>> ConsultarTodosAsync()
        {
            return await _context.Clientes
                .Include(f => f.Usuario)
                .ToListAsync();
        }

        public async Task<Cliente?> ConsultarPorIdAsync(int id)
        {
            return await _context.Clientes
                .Include(f => f.Usuario)
                .FirstOrDefaultAsync(f => f.Id == id);
        }

        public async Task<Cliente> CriarAsync(Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();
            return cliente;
        }

        public async Task<bool> AtualizarAsync(Cliente cliente)
        {
            var existente = await ConsultarPorIdAsync(cliente.Id);
            if (existente == null)
                return false;

            _context.Entry(existente).CurrentValues.SetValues(cliente);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}