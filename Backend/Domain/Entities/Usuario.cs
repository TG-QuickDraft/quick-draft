using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Backend.Domain.Entities
{
    [Table("usuarios")]
    [Index(nameof(Cpf), IsUnique = true)]
    [Index(nameof(Email), IsUnique = true)]
    public class Usuario
    {
        [Key]
        [Column("usu_id")]
        public int Id { get; set; }
        
        [Column("usu_nome")]
        [Required]
        public string Nome { get; set; } = "";

        [Column("usu_cpf")]
        [Required]
        public string Cpf { get; set; } = "";

        [Column("usu_email")]
        [Required]
        public string Email { get; set; } = "";

        [Column("usu_foto_perfil_url")]
        public string? FotoPerfilUrl { get; set; }

        [Column("usu_hash_senha")]
        [Required]
        public string HashSenha { get; set; } = "";

        [Column("usu_is_admin")]
        [Required]
        [DefaultValue(false)]
        public bool IsAdmin { get; set; }

        [JsonIgnore]
        public Freelancer? Freelancer { get; set; }

        [JsonIgnore]
        public Cliente? Cliente { get; set; }
    }
}