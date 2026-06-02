using Backend.Infrastructure.Persistence.Exceptions;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Backend.Infrastructure.Persistence.Interceptors
{
    public class DbExceptionInterceptor : SaveChangesInterceptor
    {
        public override void SaveChangesFailed(DbContextErrorEventData eventData)
        {
            DbExceptionTranslator.ThrowIfKnown(eventData.Exception);
        }

        public override Task SaveChangesFailedAsync(
            DbContextErrorEventData eventData,
            CancellationToken cancellationToken = default)
        {
            DbExceptionTranslator.ThrowIfKnown(eventData.Exception);
            return Task.CompletedTask;
        }
    }
}
