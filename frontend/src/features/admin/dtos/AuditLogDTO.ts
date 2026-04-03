export type PrimitiveValueDTO = string | number | boolean | null;

export type ModifiedValueDTO= {
  Old: PrimitiveValueDTO;
  New: PrimitiveValueDTO;
};

export type AuditLogDTO = {
  entityName: string;
  dateTime: string | Date;
  action: "Added" | "Modified" | "Deleted" | string;
  changes: Record<string, PrimitiveValueDTO | ModifiedValueDTO> | null;
  user: string;
};
