using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Freelancer> Freelancers { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

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
        }
    }
}