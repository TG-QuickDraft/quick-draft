using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Domain.Entities
{
   [Table("projetos_destacados_proposta")]
   public class ProjetoDestacadoProposta
    {
        [Column("pde_prj_id")]
        [Required]
        public int ProjetoFreelancerId { get; set; }

        [Column("pde_pro_id")]
        [Required]
        public int PropostaId { get; set; }
        
        public ProjetoFreelancer? ProjetoFreelancer { get; set; }
        
        [JsonIgnore]
        public Proposta? Proposta { get; set; }
    }
}