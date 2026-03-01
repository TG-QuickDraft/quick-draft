using AutoMapper;

namespace Backend.Application.Pagination.Extensions
{
    public static class PagedResultExtensions
    {
        public static PagedResult<TDest> Map<TSrc, TDest>(
            this PagedResult<TSrc> source,
            IMapper mapper
        )
        {
            return new PagedResult<TDest>
            {
                Itens = mapper.Map<IEnumerable<TDest>>(source.Itens),
                Total = source.Total,
                Pagina = source.Pagina,
                TamanhoPagina = source.TamanhoPagina
            };
        }
    }
}