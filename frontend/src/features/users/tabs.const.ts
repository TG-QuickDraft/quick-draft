import type { Tab } from "@/shared/components/ui/Tabs";

export type TabItem = {
  label: string;
  value: Tab;
  total?: number;
};

export const SERVICE_TABS = [
  { label: "Todos", value: "todos" },
  { label: "Em Andamento", value: "emAndamento" },
  { label: "Sem Atribuição", value: "semAtribuicao" },
] as const;
