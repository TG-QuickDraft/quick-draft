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
        public DbSet<Proposta> Propostas { get; set; }
        public DbSet<ProjetoDestacadoProposta> ProjetosDestacadosProposta { get; set; }
        public DbSet<ContaBancaria> ContasBancarias { get; set; }
        public DbSet<TipoConta> TiposContas { get; set; }
        public DbSet<CartaoCredito> CartoesCredito { get; set; }
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
                    .HasConstraintName("fk_fre_usu");
            });

            modelBuilder.Entity<ProjetoFreelancer>(entity =>
            {
                entity
                    .HasOne(pro => pro.Freelancer)
                    .WithMany(f => f.ProjetosFreelancer)
                    .HasForeignKey(pro => pro.FreelancerId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("fk_prj_fre");
            });

            modelBuilder.Entity<Servico>(entity =>
            {
                entity.HasOne(s => s.Cliente)
                    .WithMany(c => c.Servicos)
                    .HasForeignKey(s => s.ClienteId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("fk_ser_cli");

                entity.HasMany(s => s.Propostas)
                    .WithOne(p => p.Servico)
                    .HasForeignKey(p => p.ServicoId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("fk_ser_pro");

                entity.HasOne(s => s.PropostaAceita)
                    .WithOne(p => p.ServicoOndeFoiAceita)
                    .HasForeignKey<Servico>(s => s.PropostaAceitaId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("fk_ser_pro_aceita");
            });

            modelBuilder.Entity<Proposta>(entity =>
            {
                entity.HasOne(p => p.Freelancer)
                    .WithMany(f => f.Propostas)
                    .HasForeignKey(p => p.FreelancerId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("fk_pro_fre");

                entity.HasOne(p => p.Servico)
                    .WithMany(s => s.Propostas)
                    .HasForeignKey(p => p.ServicoId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("fk_pro_ser");
            });

            modelBuilder.Entity<ProjetoDestacadoProposta>(entity =>
            {
                entity.HasKey(p => new { p.ProjetoFreelancerId, p.PropostaId });

                entity.HasOne(p => p.ProjetoFreelancer)
                    .WithMany(f => f.ProjetosDestacados)
                    .HasForeignKey(p => p.ProjetoFreelancerId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("fk_pde_prj");

                entity.HasOne(prj => prj.Proposta)
                    .WithMany(pro => pro.ProjetosDestacados)
                    .HasForeignKey(p => p.PropostaId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("fk_pde_pro");
            });

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.Property(c => c.Id).ValueGeneratedNever();

                entity
                    .HasOne(c => c.Usuario)
                    .WithOne(u => u.Cliente)
                    .HasForeignKey<Cliente>(c => c.Id)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("fk_cli_usu");
            });

            modelBuilder
                .Entity<ContaBancaria>()
                .HasOne(c => c.Freelancer)
                .WithOne(f => f.ContaBancaria)
                .HasForeignKey<ContaBancaria>(c => c.Id)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder
                .Entity<ContaBancaria>()
                .HasOne(c => c.TipoConta)
                .WithMany(t => t.ContasBancarias)
                .HasForeignKey(c => c.TipoContaId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("fk_con_tpc");

            modelBuilder.Entity<CartaoCredito>()
                .HasOne(car => car.Cliente)
                .WithOne(cli => cli.CartaoCredito)
                .HasForeignKey<CartaoCredito>(c => c.Id)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder
                .Entity<TipoConta>()
                .HasData(
                    new TipoConta { Id = 1, Nome = "Corrente" },
                    new TipoConta { Id = 2, Nome = "Poupança" }
                );

            modelBuilder.Entity<CartaoCredito>()
                .HasOne(c => c.Bandeira)
                .WithMany(b => b.CartoesCredito)
                .HasForeignKey(c => c.BandeiraId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("fk_cre_bcc");

            modelBuilder
                .Entity<BandeiraCartaoCredito>()
                .HasData(
                    new BandeiraCartaoCredito { Id = 1, Nome = "Mastercard" },
                    new BandeiraCartaoCredito { Id = 2, Nome = "Visa" },
                    new BandeiraCartaoCredito { Id = 3, Nome = "Elo" },
                    new BandeiraCartaoCredito { Id = 4, Nome = "American Express" },
                    new BandeiraCartaoCredito { Id = 5, Nome = "Hipercard" }
                );

            modelBuilder.Entity<Usuario>().HasData(
                new Usuario
                {
                    Id = -1,
                    Nome = "Administrador do Sistema",
                    Cpf = "00000000000",
                    Email = "admin@sistema.com",
                    FotoPerfilUrl = "uploads/fotos-perfil/fotoADM.jpg",
                    HashSenha = "AQAAAAIAAYagAAAAEHEM/Yc24Gwy0usv3Q4hrhUuLkyawKFjak/+t9BLGQo+9o5ziRkt7Rel7X6oHFVYOw==",
                    IsAdmin = true
                }
            );
        }
    }
}