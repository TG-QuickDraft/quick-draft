export type AuditLogDTO = {
  entityName:   string;
  dateTime:     Date;
  action:       string;
  changes:      object;
  user:         string;
};