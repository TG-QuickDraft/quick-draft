import { InfoCard } from "@/shared/components/ui/InfoCard";

export const SummaryCards = ({ roles }: { roles: string[] }) => {
  return (
    <div className="flex gap-12 items-center">
      {roles.includes("Freelancer") && (
        <>
          <InfoCard
            className="px-10! py-6! min-w-45"
            dark
            value="0"
            label="Propostas Enviadas"
          />
          <InfoCard
            className="px-10! py-6! min-w-45"
            value="0"
            label="Ganhos"
          />
        </>
      )}

      {roles.includes("Cliente") && (
        <>
          <InfoCard
            className="px-10! py-6! min-w-45"
            dark
            value="0"
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
