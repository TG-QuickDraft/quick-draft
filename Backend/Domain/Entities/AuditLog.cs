using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
    [Table("audit_logs")]
    public class AuditLog
    {
        [Key]
        [Column("adl_id")]
        public int Id { get; set; }

        [Column("adl_entity_name")]
        [Required]
        public string EntityName { get; set; } = null!;

        [Column("adl_datetime")]
        [Required]
        public DateTime DateTime { get; set; }

        [Column("adl_action")]
        [Required]
        public string Action { get; set; } = null!;

        [Column("adl_changes")]
        [Required]
        public string Changes { get; set; } = null!;

        [Column("adl_user")]
        [Required]
        public string User { get; set; } = null!;
    }
}
