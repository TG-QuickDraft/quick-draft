export type PrimitiveValue = string | number | boolean | null;

export type ModifiedValue = {
  Old: PrimitiveValue;
  New: PrimitiveValue;
};

export type AuditLogDTO = {
  entityName: string;
  dateTime: string | Date;
  action: "Added" | "Modified" | "Deleted" | string;
  changes: Record<string, PrimitiveValue | ModifiedValue> | null;
  user: string;
};
