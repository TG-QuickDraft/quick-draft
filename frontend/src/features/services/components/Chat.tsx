import Button from "@/shared/components/ui/buttons/Button";
import Input from "@/shared/components/ui/Inputs/Input";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import clsx from "clsx";
import { MdOutlineSend } from "react-icons/md";

export const Chat = ({
  mensagem,
  setMensagem,
  mensagens,
  adicionarMensagem,
  destinatario,
}: {
  mensagem: any;
  setMensagem: (value: string) => void;
  mensagens: any[];
  adicionarMensagem: () => void;
  destinatario: string;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      adicionarMensagem();
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full">
      <section className="flex shrink-0 gap-8 border-b border-b-gray-300 p-4">
        <ProfilePhoto photoPath="" className="w-auto!" size="sm" />
        <p className="mt-2">{destinatario}</p>
      </section>

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

        <Button icon={<MdOutlineSend />} onClick={adicionarMensagem} />
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
