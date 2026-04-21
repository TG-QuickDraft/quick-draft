import Button from "@/shared/components/ui/buttons/Button";
import Input from "@/shared/components/ui/Inputs/Input";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import clsx from "clsx";
import { MdOutlineSend } from "react-icons/md";
import type { ServicoDTO } from "@/features/services/proposal/dtos/ServicoDTO";
import { toLocaleString } from "@/shared/utils/date.utils";
import Title from "@/shared/components/ui/titles/Title";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect, useRef } from "react";
import { BackButton } from "@/shared/components/ui/buttons/BackButton";

import CaixaMensagem from "./CaixaMensagem";
import LimitadorLargura from "./LimitadorLargura";

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
        <LimitadorLargura>
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
        </LimitadorLargura>
      </div>

      <section className={clsx("flex-1 overflow-y-auto p-4 bg-gray-100")}>
        <LimitadorLargura>
          {mensagens.map((m, index) => (
            <CaixaMensagem
              key={index}
              mensagem={m.mensagem}
              isRemetente={m.usuarioId === usuario.id}
              time={m.data}
            />
          ))}
          <div ref={messagesEndRef} />
        </LimitadorLargura>
      </section>

      <section
        className={clsx("border-t border-t-gray-300 bg-white p-4 flex gap-4")}
      >
        <LimitadorLargura direction="row">
          <Input
            placeholder="Digite sua mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button icon={<MdOutlineSend />} onClick={enviarMensagem} />
        </LimitadorLargura>
      </section>
    </div>
  );
};
