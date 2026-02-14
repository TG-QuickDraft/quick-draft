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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity
                    .HasIndex(u => u.Email)
                    .IsUnique();

                entity
                    .HasIndex(u => u.Cpf)
                    .IsUnique();
            });

            modelBuilder.Entity<Freelancer>(entity =>
            {
                entity.Property(f => f.Id)
                    .ValueGeneratedNever();

                entity.HasOne(f => f.Usuario)
                    .WithOne(u => u.Freelancer)
                    .HasForeignKey<Freelancer>(f => f.Id)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_freelancers_usuarios");
            });

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.Property(c => c.Id)
                    .ValueGeneratedNever();

                entity.HasOne(c => c.Usuario)
                    .WithOne(u => u.Cliente)
                    .HasForeignKey<Cliente>(c => c.Id)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_clientes_usuarios");
            });

            modelBuilder.Entity<ContaBancaria>()
                .HasOne(c => c.Freelancer)
                .WithOne(f => f.ContaBancaria)
                .HasForeignKey<ContaBancaria>(c => c.FreelancerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TipoConta>().HasData(
                new TipoConta { Id = 1, Nome = "Corrente" },
                new TipoConta { Id = 2, Nome = "Poupança" }
            );
        }
    }
}