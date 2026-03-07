using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Domain.Entities
{
   [Table("projetos_freelancer")]
   public class ProjetoFreelancer
    {
        [Key]
        [Column("pjf_id")]
        public int Id { get; set; }

        [Column("pjf_nome")]
        [Required]
        public string? Nome { get; set; }

        [Column("pjf_descricao")]
        public string? Descricao { get; set; }

        [Column("pjf_imagem_url")]
        public string? ImagemUrl { get; set; }

        [Column("pjf_link")]
        public string? Link { get; set; }

        [Column("pjf_fre_id")]
        [Required]
        public int FreelancerId { get; set; }

        [JsonIgnore]
        public Freelancer? Freelancer { get; set; }

        [JsonIgnore]
        public ICollection<ProjetoDestacadoProposta>? ProjetosDestacados { get; set; } = [];
    }
}
