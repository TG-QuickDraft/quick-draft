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
import { BackButton } from "@/shared/components/ui/buttons/BackButton";

import { formatInTimeZone } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

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
        <WidthLimiter>
          <section className="flex justify-between w-full">
            <Title className="text-start">
              <BackButton>{servico.nome}</BackButton>
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
        </WidthLimiter>
      </div>

      <section className={clsx("flex-1 overflow-y-auto p-4 bg-gray-100")}>
        <WidthLimiter>
          {mensagens.map((m, index) => (
            <CaixaMensagem
              key={index}
              mensagem={m.mensagem}
              isRemetente={m.usuarioId === usuario.id}
              time={m.data}
            />
          ))}
          <div ref={messagesEndRef} />
        </WidthLimiter>
      </section>

      <section
        className={clsx("border-t border-t-gray-300 bg-white p-4 flex gap-4")}
      >
        <WidthLimiter direction="row">
          <Input
            placeholder="Digite sua mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button icon={<MdOutlineSend />} onClick={enviarMensagem} />
        </WidthLimiter>
      </section>
    </div>
  );
};

const WidthLimiter = ({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction?: "row" | "col";
}) => {
  return (
    <div
      className={clsx(
        "flex gap-4 px-4",
        "md:px-10 max-w-280 mx-auto w-full",
        direction === "row" ? "flex-row" : "flex-col",
      )}
    >
      {children}
    </div>
  );
};

const CaixaMensagem = ({
  mensagem,
  isRemetente,
  time,
}: {
  mensagem: string;
  isRemetente: boolean;
  time: string;
}) => {
  const timeZone = "America/Sao_Paulo";

  return (
    <div
      className={clsx(
        "flex w-full",
        isRemetente ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={clsx(
          "flex flex-col rounded-xl p-2 max-w-[70%] break-all",
          isRemetente ? "bg-secondary-100" : "bg-gray-300",
        )}
      >
        <p className={clsx(isRemetente ? "self-end" : "self-start")}>
          {mensagem}
        </p>
        <p
          className={clsx(
            "text-neutral-80",
            isRemetente ? "self-end" : "self-start",
          )}
        >
          {formatInTimeZone(time, timeZone, "HH:mm", {
            locale: ptBR,
          })}
        </p>
      </div>
    </div>
  );
};
