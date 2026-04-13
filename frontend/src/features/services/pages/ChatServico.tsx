import { useEffect, useState } from "react";

import { Chat } from "../components/Chat";

import { BackButton } from "@/shared/components/ui/buttons/BackButton";
import { useParams, useSearchParams } from "react-router-dom";
import type { ServicoDTO } from "../dtos/ServicoDTO";
import { useModal } from "@/shared/contexts/modal.context";
import Spinner from "@/shared/components/ui/Spinner";

import type { UsuarioDTO } from "@/features/users/dtos/UsuarioDTO";
import { useAuth } from "@/features/auth/hooks/useAuth";

import { consultarServicoPorId } from "../api/servico.api";
import { consultarClientePorId } from "@/features/clients/api/cliente.api";
import { consultarFreelancerPorId } from "@/features/freelancers/api/freelancer.api";
import { buscarPropostaPorId } from "@/features/freelancers/api/proposta.api";

import { consultarMensagens } from "../api/chat.api";
import { criarMensagem } from "../api/chat.api";
import type { MensagemDTO } from "../dtos/MensagemDTO";
import { useChatConnection } from "../hooks/useChatConnection";
import clsx from "clsx";

export const ChatServico = () => {
  const { id } = useParams();

  const [params] = useSearchParams();
  const propostaId = Number(params.get("propostaId"));

  const { showError } = useModal();
  const { roles, usuario: user } = useAuth();

  const [isLoadingRecipient, setIsLoadingRecipient] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isMessagePending, setIsMessagePending] = useState(false);

  const [servico, setServico] = useState<ServicoDTO | null>(null);
  const [usuario, setUsuario] = useState<UsuarioDTO | null>(null);

  const [mensagem, setMensagem] = useState<string>("");
  const [chatSelecionado, setChatSelecionado] = useState<number>(0);
  const [chat, setChat] = useState<MensagemDTO[]>([]);

  const { incomingMessage } = useChatConnection(Number(id));

  useEffect(() => {
    if (incomingMessage) {
      setChat((prev) => [...prev, incomingMessage]);
    }
  }, [incomingMessage]);

  const enviarMensagem = async () => {
    if (mensagem && mensagem.trim().length > 0 && user?.id) {
      let timer = setTimeout(() => setIsMessagePending(true), 500);
      try {
        await criarMensagem({
          servicoId: Number(id),
          mensagem,
        });
        setMensagem("");
      } catch (error) {
        error instanceof Error
          ? showError({ content: error.message })
          : showError({ content: "Erro ao enviar mensagem" });
      } finally {
        setIsMessagePending(false);
        clearTimeout(timer);
      }
    }
  };

  useEffect(() => {
    (async () => {
      let timer = setTimeout(() => setIsLoadingHistory(true), 1000);
      try {
        const chat = await consultarMensagens(Number(id));
        setChat(chat);
      } catch (error) {
        error instanceof Error
          ? showError({ content: error.message })
          : showError({ content: "Erro ao carregar histórico de chat" });
      } finally {
        setIsLoadingHistory(false);
        clearTimeout(timer);
      }
    })();
  }, [chatSelecionado]);

  useEffect(() => {
    (async () => {
      let timer = setTimeout(() => setIsLoadingRecipient(true), 1000);
      try {
        const servico = await consultarServicoPorId(Number(id));

        if (servico) {
          if (roles.includes("Cliente")) {
            const proposta = await buscarPropostaPorId(propostaId);
            if (proposta) {
              const freelancer = await consultarFreelancerPorId(
                proposta.freelancerId,
              );
              setUsuario(freelancer);
            }
          }

          if (roles.includes("Freelancer")) {
            const cliente = await consultarClientePorId(servico.clienteId);
            setUsuario(cliente);
          }
        }

        setServico(servico);
      } catch (error) {
        showError({
          content: "Erro ao consultar dados do destinatário",
        });
      } finally {
        setIsLoadingRecipient(false);
        clearTimeout(timer);
      }
    })();
  }, [id]);

  // const trocarChat = (index: number) => {
  //   setChatSelecionado(index);
  //   setChat(chats[index]);
  // };

  if (isLoadingRecipient || isLoadingHistory || isMessagePending)
    return <Spinner />;

  if (!servico || !usuario) return null;

  return (
    <div className="flex flex-1 items-start w-full flex-col min-h-0 overflow-hidden">
      {/* <BackButton className="mt-2 py-0!" /> */}
      <div className={clsx("flex flex-1 min-h-0 w-full")}>
        {/* <section className="hidden md:flex flex-col items-center w-80 min-h-0 overflow-y-auto p-4">
          <Title className="mb-4">Conversas</Title>

          <div className="flex flex-col gap-4">
            {chats.map((chat, index) => (
              <SelecaoServicoChat
                key={index}
                selected={chatSelecionado === index}
                destinatario={{ nome: chat.destinario, fotoPerfilUrl: "" }}
                servico={chat.servico}
                onClick={() => trocarChat(index)}
              />
            ))}
          </div>
        </section> */}

        <section className="flex flex-1 min-h-0 max-h-[calc(100vh-120px)] ">
          <Chat
            mensagem={mensagem}
            mensagens={chat}
            destinatario={{
              nome: usuario.nome,
              fotoPerfilUrl: usuario.fotoPerfilUrl || "",
            }}
            servico={servico}
            setMensagem={setMensagem}
            enviarMensagem={enviarMensagem}
          />
        </section>
      </div>
    </div>
  );
};
