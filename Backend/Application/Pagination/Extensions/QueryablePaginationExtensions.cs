using Microsoft.EntityFrameworkCore;

namespace Backend.Application.Pagination.Extensions
{
    public static class QueryablePaginationExtensions
    {
        public static async Task<PagedResult<T>> ToPagedResultAsync<T>(
            this IQueryable<T> query,
            int pagina,
            int tamanhoPagina
        )
        {
            var total = await query.CountAsync();

            var itens = await query
                .Skip((pagina - 1) * tamanhoPagina)
                .Take(tamanhoPagina)
                .ToListAsync();

            return new PagedResult<T>
            {
                Itens = itens,
                Total = total,
                Pagina = pagina,
                TamanhoPagina = tamanhoPagina
            };
        }
    }
}
