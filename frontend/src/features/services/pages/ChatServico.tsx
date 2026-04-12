import { useEffect, useState } from "react";

import { Chat } from "../components/Chat";
import { SelecaoServicoChat } from "../components/SelecaoServicoChat";
import Title from "@/shared/components/ui/titles/Title";

import { BackButton } from "@/shared/components/ui/buttons/BackButton";
import { consultarServicoPorId } from "../api/servico.api";
import { useParams } from "react-router-dom";
import type { ServicoDTO } from "../dtos/ServicoDTO";
import { useModal } from "@/shared/contexts/modal.context";
import Spinner from "@/shared/components/ui/Spinner";

const chats = [
  {
    mensagens: [
      {
        usuarioId: 1,
        mensagem: "Oi, eu sou o a pessoa que tá escrevendo :sim:",
      },
      {
        usuarioId: 2,
        mensagem: "Oi, eu sou a pessoa que está enviando mensagens para você",
      },
      {
        usuarioId: 2,
        mensagem: "Mandei mais mensagens",
      },
      {
        usuarioId: 1,
        mensagem: "Boa",
      },
    ],
    destinario: "José Pires",
    servico: {
      clienteId: 0,
      descricao: "",
      id: 0,
      isEntregue: false,
      nome: "Rebranding das Lojas Americanas",
      orcamentoIsAberto: true,
      prazo: "2026-03-04",
      valorMinimo: 0,
      propostaAceitaId: 0,
    },
  },
  {
    mensagens: [
      {
        usuarioId: 2,
        mensagem: "Oi, estou em outro chat agora",
      },
      {
        usuarioId: 1,
        mensagem: "Legal",
      },
    ],
    destinario: "Professor Carvalho",
    servico: {
      clienteId: 0,
      descricao: "",
      id: 0,
      isEntregue: false,
      nome: "Logo",
      orcamentoIsAberto: true,
      prazo: "2026-03-03",
      valorMinimo: 0,
      propostaAceitaId: 0,
    },
  },
];

export const ChatServico = () => {
  const { id } = useParams();
  const { showError } = useModal();

  const [loading, setLoading] = useState(false);
  const [servico, setServico] = useState<ServicoDTO | null>(null);

  const [mensagem, setMensagem] = useState<string>("");
  const [chatSelecionado, setChatSelecionado] = useState<number>(0);
  const [chat, setChat] = useState(chats[0]);

  const enviarMensagem = () => {
    if (mensagem && mensagem.trim().length > 0) {
      setChat({
        ...chat,
        mensagens: [...chat.mensagens, { usuarioId: 1, mensagem: mensagem }],
      });

      setMensagem("");
    }
  };

  const trocarChat = (index: number) => {
    setChatSelecionado(index);
    setChat(chats[index]);
  };

  useEffect(() => {
    (async () => {
      let timer = setTimeout(() => setLoading(true), 1000);
      try {
        const res = await consultarServicoPorId(Number(id));
        setServico(res);
      } catch (error) {
        showError({ content: "Erro ao consultar serviço" });
      } finally {
        setLoading(false);
        clearTimeout(timer);
      }
    })();
  }, [id]);

  if (loading) return <Spinner />;

  if (!servico) return null;

  return (
    <div className="flex flex-1 items-start w-full flex-col min-h-0 overflow-hidden">
      <BackButton className="mt-2 py-0!" />
      <div className="flex flex-1 min-h-0 border-t border-t-gray-300 divide-x divide-gray-300 mt-4 w-full">
        <section className="hidden md:flex flex-col items-center w-80 min-h-0 overflow-y-auto p-4">
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
        </section>

        <section className="flex flex-1 min-h-0 max-h-[calc(100vh-220px)]">
          <Chat
            mensagem={mensagem}
            mensagens={chat.mensagens}
            destinatario={{ nome: chat.destinario, fotoPerfilUrl: "" }}
            servico={servico}
            setMensagem={setMensagem}
            enviarMensagem={enviarMensagem}
          />
        </section>
      </div>
    </div>
  );
};
