using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Backend.Infrastructure.Persistence.Interceptors
{
    public class AuditInterceptor : SaveChangesInterceptor
    {
        private static readonly HashSet<string> IgnoredProperties = ["HashSenha"];

        public override async ValueTask<InterceptionResult<int>> SavingChangesAsync(
            DbContextEventData eventData,
            InterceptionResult<int> result,
            CancellationToken cancellationToken = default)
        {
            var context = eventData.Context;

            if (context == null)
                return await base.SavingChangesAsync(eventData, result, cancellationToken);

            var auditEntries = context.ChangeTracker
                .Entries()
                .Where(e =>
                    e.State == EntityState.Added ||
                    e.State == EntityState.Modified ||
                    e.State == EntityState.Deleted)
                .ToList();

            foreach (var entry in auditEntries)
            {
                if (entry.Entity is AuditLog)
                    continue;

                var entityName = entry.Metadata.ClrType.Name;
                var action = entry.State.ToString();
                object? changes = null;

                switch (entry.State)
                {
                    case EntityState.Added:
                        changes = entry.CurrentValues.Properties
                            .Where(p => !IgnoredProperties.Contains(p.Name))
                            .ToDictionary(p => p.Name, p => entry.CurrentValues[p]);
                        break;

                    case EntityState.Modified:
                        var modifiedProperties = entry.Properties
                            .Where(p => p.IsModified && !IgnoredProperties.Contains(p.Metadata.Name))
                            .ToDictionary(
                                p => p.Metadata.Name,
                                p => new { Old = p.OriginalValue, New = p.CurrentValue });

                        if (modifiedProperties.Count == 0)
                            continue;

                        changes = modifiedProperties;
                        break;

                    case EntityState.Deleted:
                        changes = entry.OriginalValues.Properties
                            .Where(p => !IgnoredProperties.Contains(p.Name))
                            .ToDictionary(p => p.Name, p => entry.OriginalValues[p]);
                        break;
                }

                var audit = new AuditLog
                {
                    EntityName = entityName,
                    DateTime = DateTime.UtcNow,
                    Action = action,
                    Changes = System.Text.Json.JsonSerializer.Serialize(changes),
                    User = "System"
                };

                context.Set<AuditLog>().Add(audit);
            }

            return await base.SavingChangesAsync(eventData, result, cancellationToken);
        }
    }

}