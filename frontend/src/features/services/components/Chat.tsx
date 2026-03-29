import Button from "@/shared/components/ui/buttons/Button";
import Input from "@/shared/components/ui/Inputs/Input";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import clsx from "clsx";
import { MdOutlineSend } from "react-icons/md";
import type { Servico } from "../dtos/Servico";
import { toLocaleString } from "@/shared/utils/date.utils";
import Title from "@/shared/components/ui/titles/Title";

type ChatProps = {
  mensagem: string;
  setMensagem: (value: string) => void;
  mensagens: any[];
  enviarMensagem: () => void;
  destinatario: {
    nome: string;
    fotoPerfilUrl: string;
  };
  servico: Servico;
};

export const Chat = ({
  mensagem,
  setMensagem,
  mensagens,
  enviarMensagem,
  destinatario,
  servico,
}: ChatProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      enviarMensagem();
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full">
      <div className="flex flex-col shrink-0 gap-8 border-b border-b-gray-300 p-4">
        <section className="flex justify-between w-full">
          <Title className="text-start">
            <strong>{servico.nome}</strong>
          </Title>
          <p className="text-gray-500">
            {toLocaleString(servico.prazo, { somenteData: true })}
          </p>
        </section>

        <section className="flex gap-4 items-center">
          <ProfilePhoto
            photoPath={destinatario.fotoPerfilUrl}
            className="w-auto!"
            size="sm"
          />
          <p>{destinatario.nome}</p>
        </section>
      </div>

      <section className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-4">
        {mensagens.map((m, index) => (
          <CaixaMensagem
            key={index}
            mensagem={m.mensagem}
            isRemetente={m.isMeu}
          />
        ))}
      </section>

      <section className="shrink-0 border-t border-t-gray-300 bg-white p-4 flex gap-4">
        <Input
          placeholder="Digite sua mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Button icon={<MdOutlineSend />} onClick={enviarMensagem} />
      </section>
    </div>
  );
};

const CaixaMensagem = ({
  mensagem,
  isRemetente,
}: {
  mensagem: string;
  isRemetente: boolean;
}) => {
  return (
    <div
      className={clsx(
        "flex w-full",
        isRemetente ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={clsx(
          "rounded-xl p-2 max-w-[70%] break-all",
          isRemetente ? "bg-secondary-100" : "bg-gray-100",
        )}
      >
        <p className="text-sm">{mensagem}</p>
      </div>
    </div>
  );
};
