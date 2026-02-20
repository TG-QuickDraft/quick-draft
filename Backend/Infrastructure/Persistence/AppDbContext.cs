using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Persistence
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Freelancer> Freelancers { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Servico> Servicos { get; set; }
        public DbSet<ProjetoFreelancer> ProjetosFreelancer { get; set; }
        public DbSet<ContaBancaria> ContasBancarias { get; set; }
        public DbSet<TipoConta> TiposContas { get; set; }
        public DbSet<BandeiraCartaoCredito> BandeirasCartaoCredito { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasIndex(u => u.Email).IsUnique();

                entity.HasIndex(u => u.Cpf).IsUnique();
            });

            modelBuilder.Entity<Freelancer>(entity =>
            {
                entity.Property(f => f.Id).ValueGeneratedNever();

                entity
                    .HasOne(f => f.Usuario)
                    .WithOne(u => u.Freelancer)
                    .HasForeignKey<Freelancer>(f => f.Id)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_freelancers_usuarios");
            });

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.Property(c => c.Id).ValueGeneratedNever();

                entity
                    .HasOne(c => c.Usuario)
                    .WithOne(u => u.Cliente)
                    .HasForeignKey<Cliente>(c => c.Id)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_clientes_usuarios");
            });

            modelBuilder
                .Entity<ContaBancaria>()
                .HasOne(c => c.Freelancer)
                .WithOne(f => f.ContaBancaria)
                .HasForeignKey<ContaBancaria>(c => c.FreelancerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder
                .Entity<TipoConta>()
                .HasData(
                    new TipoConta { Id = 1, Nome = "Corrente" },
                    new TipoConta { Id = 2, Nome = "Poupança" }
                );

            modelBuilder
                .Entity<BandeiraCartaoCredito>()
                .HasData(
                    new BandeiraCartaoCredito { Id = 1, Nome = "Mastercard" },
                    new BandeiraCartaoCredito { Id = 2, Nome = "Visa" },
                    new BandeiraCartaoCredito { Id = 3, Nome = "Elo" },
                    new BandeiraCartaoCredito { Id = 4, Nome = "American Express" },
                    new BandeiraCartaoCredito { Id = 5, Nome = "Hipercard" }
                );
        }

        private static readonly HashSet<string> IgnoredProperties = new() { "HashSenha" };

        public override async Task<int> SaveChangesAsync(
            CancellationToken cancellationToken = default
        )
        {
            var auditEntries = ChangeTracker
                .Entries()
                .Where(e =>
                    e.State == EntityState.Added
                    || e.State == EntityState.Modified
                    || e.State == EntityState.Deleted
                )
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
                    {
                        changes = entry
                            .CurrentValues.Properties.Where(p =>
                                !IgnoredProperties.Contains(p.Name)
                            )
                            .ToDictionary(p => p.Name, p => entry.CurrentValues[p]);
                        break;
                    }

                    case EntityState.Modified:
                    {
                        var modifiedProperties = entry
                            .Properties.Where(p =>
                                p.IsModified && !IgnoredProperties.Contains(p.Metadata.Name)
                            )
                            .ToDictionary(
                                p => p.Metadata.Name,
                                p => new { Old = p.OriginalValue, New = p.CurrentValue }
                            );

                        if (modifiedProperties.Count == 0)
                            continue;

                        changes = modifiedProperties;
                        break;
                    }

                    case EntityState.Deleted:
                    {
                        changes = entry
                            .OriginalValues.Properties.Where(p =>
                                !IgnoredProperties.Contains(p.Name)
                            )
                            .ToDictionary(p => p.Name, p => entry.OriginalValues[p]);
                        break;
                    }

                    default:
                        continue;
                }

                var audit = new AuditLog
                {
                    EntityName = entityName,
                    DateTime = DateTime.UtcNow,
                    Action = action,
                    Changes = System.Text.Json.JsonSerializer.Serialize(changes),
                    User = "System",
                };

                AuditLogs.Add(audit);
            }

            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
