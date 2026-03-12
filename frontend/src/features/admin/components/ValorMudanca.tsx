import type { ModifiedValue, PrimitiveValue } from "../dtos/AuditLogDTO";

interface ValorMudancaProps {
  valor: PrimitiveValue | ModifiedValue;
}

const ValorMudanca = ({ valor }: ValorMudancaProps) => {
  if (valor === null || typeof valor !== "object") {
    return <span>{valor === null ? "nulo" : String(valor)}</span>;
  }

  if ("Old" in valor || "New" in valor) {
    const valorAntigo = valor.Old === null ? "nulo" : String(valor.Old);
    const valorNovo = valor.New === null ? "nulo" : String(valor.New);

    return (
      <span className="flex items-center gap-2">
        <span
          className="text-red-500 line-through text-xs"
          title="Valor antigo"
        >
          {valorAntigo}
        </span>
        <span className="text-gray-400">➔</span>
        <span className="text-green-600 font-medium text-sm" title="Valor novo">
          {valorNovo}
        </span>
      </span>
    );
  }

  return <span>{JSON.stringify(valor)}</span>;
};

export default ValorMudanca;
