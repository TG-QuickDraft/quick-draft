using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
   [Table("projetos_destacados_proposta")]
   public class ProjetoDestacadoProposta
    {
        [Key]
        [Column("pde_prj_id")]
        public int ProjetoFreelancerId { get; set; }

        [Key]
        [Column("pde_pro_id")]
        public int PropostaId { get; set; }

        [ForeignKey(nameof(ProjetoFreelancerId))]
        public ProjetoFreelancer? ProjetoFreelancer { get; set; }

        [ForeignKey(nameof(PropostaId))]
        public Proposta? Proposta { get; set; }
    }
}