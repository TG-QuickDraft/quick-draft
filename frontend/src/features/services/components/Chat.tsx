import Button from "@/shared/components/ui/buttons/Button";
import Input from "@/shared/components/ui/Inputs/Input";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import clsx from "clsx";
import { MdOutlineSend } from "react-icons/md";
import type { ServicoDTO } from "../dtos/ServicoDTO";
import { toLocaleString } from "@/shared/utils/date.utils";
import Title from "@/shared/components/ui/titles/Title";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect, useRef } from "react";

type ChatProps = {
  mensagem: string;
  mensagens: any[];
  destinatario: {
    nome: string;
    fotoPerfilUrl: string;
  };
  servico: ServicoDTO;
  setMensagem: (value: string) => void;
  enviarMensagem: () => void;
};

export const Chat = ({
  mensagem,
  mensagens,
  destinatario,
  servico,
  setMensagem,
  enviarMensagem,
}: ChatProps) => {
  const { usuario } = useAuth();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensagens]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      enviarMensagem();
    }
  };

  if (!usuario) return <div>Usuário logado não encontrado</div>;

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full">
      <div className={clsx("p-4 border-y border-y-gray-300")}>
        <div
          className={clsx(
            "flex flex-col gap-8 px-4",
            "md:px-10 max-w-300 mx-auto w-full",
          )}
        >
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
      </div>

      <section className={clsx("flex-1 overflow-y-auto p-4 bg-gray-100")}>
        <div
          className={clsx(
            "flex flex-col gap-4 px-4",
            "md:px-10 max-w-300 mx-auto w-full",
          )}
        >
          {mensagens.map((m, index) => (
            <CaixaMensagem
              key={index}
              mensagem={m.mensagem}
              isRemetente={m.usuarioId === usuario.id}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </section>

      <section
        className={clsx("border-t border-t-gray-300 bg-white p-4 flex gap-4")}
      >
        <div
          className={clsx(
            "flex gap-4 px-4",
            "md:px-10 max-w-300 mx-auto w-full",
          )}
        >
          <Input
            placeholder="Digite sua mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button icon={<MdOutlineSend />} onClick={enviarMensagem} />
        </div>
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
          isRemetente ? "bg-secondary-100" : "bg-gray-300",
        )}
      >
        <p className="text-sm">{mensagem}</p>
      </div>
    </div>
  );
};
