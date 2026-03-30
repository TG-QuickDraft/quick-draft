import { useState } from "react";

import { Chat } from "../components/Chat";
import { SelecaoServicoChat } from "../components/SelecaoServicoChat";
import Title from "@/shared/components/ui/titles/Title";

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
    },
  },
];

export const ChatServico = () => {
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

  return (
    <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
      <div className="flex flex-1 min-h-0 border-t border-t-gray-300 divide-x divide-gray-300 mt-4">
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

        <section className="flex flex-1 min-h-0 max-h-[calc(100vh-140px)]">
          <Chat
            mensagem={mensagem}
            mensagens={chat.mensagens}
            destinatario={{ nome: chat.destinario, fotoPerfilUrl: "" }}
            servico={chat.servico}
            setMensagem={setMensagem}
            enviarMensagem={enviarMensagem}
          />
        </section>
      </div>
    </div>
  );
};
