namespace Backend.Application.DTOs.Audit
{
    public class AuditLogDTO
    {
        public string EntityName { get; set; } = null!;
        public DateTime DateTime { get; set; }
        public string Action { get; set; } = null!;
        public object Changes { get; set; } = null!;
        public string User { get; set; } = null!;
    }  
}
