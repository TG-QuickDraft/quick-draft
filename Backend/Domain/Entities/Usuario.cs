using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Domain.Entities
{
    [Table("usuarios")]
    public class Usuario
    {
        [Key]
        [Column("usu_id")]
        public int Id { get; set; }
        
        [Column("usu_nome")]
        [Required]
        public string Nome { get; set; } = null!;
        
        [Column("usu_foto_perfil_url")]
        public string? FotoPerfilUrl { get; set; }

        [JsonIgnore]
        public Freelancer? Freelancer { get; set; }

        [JsonIgnore]
        public Cliente? Cliente { get; set; }
    }
}