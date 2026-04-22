import { InfoCard } from "@/shared/components/ui/InfoCard";
import { numberToCurrency } from "@/shared/utils/number.utils";

export const SummaryCards = ({
  roles,
  proposalTotal,
  serviceTotal,
}: {
  roles: string[];
  proposalTotal: number;
  serviceTotal: number;
}) => {
  return (
    <div className="flex gap-12 items-center">
      {roles.includes("Freelancer") && (
        <>
          <InfoCard
            className="px-10! py-6! min-w-45"
            dark
            value={proposalTotal}
            label="Propostas Enviadas"
          />
          <InfoCard
            className="px-10! py-6! min-w-45"
            value={numberToCurrency(0)}
            label="Ganhos"
          />
        </>
      )}

      {roles.includes("Cliente") && (
        <>
          <InfoCard
            className="px-10! py-6! min-w-45"
            dark
            value={serviceTotal}
            label="Serviços Criados"
          />
          <InfoCard
            className="px-10! py-6! min-w-45"
            value="0"
            label="Serviços Concluídos"
          />
        </>
      )}
    </div>
  );
};
