import Button from "@/shared/components/ui/buttons/Button";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import type { Servico } from "../dtos/Servico";
import { toLocaleString } from "@/shared/utils/date.utils";

export const SelecaoServicoChat = ({
  selected = false,
  destinatario,
  servico,
  onClick,
}: {
  selected?: boolean;
  destinatario: { nome: string; fotoPerfilUrl: string };
  servico: Servico;
  onClick: () => void;
}) => {
  return (
    <Button onClick={onClick} variant={selected ? "secondary" : "outline"}>
      <div className="flex flex-col gap-4 justify-start items-start w-full">
        <section className="flex justify-between w-full">
          <p className="text-start">
            <strong>{servico.nome}</strong>
          </p>
          <p className="text-sm text-gray-500">
            {toLocaleString(servico.prazo, { somenteData: true })}
          </p>
        </section>

        <section className="flex gap-4">
          <ProfilePhoto
            photoPath={destinatario.fotoPerfilUrl}
            className="w-auto!"
            size="xs"
          />
          <p>{destinatario.nome}</p>
        </section>
      </div>
    </Button>
  );
};
