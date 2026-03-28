import { useState } from "react";

import { Chat } from "../components/Chat";
import { SelecaoServicoChat } from "../components/SelecaoServicoChat";
import Title from "@/shared/components/ui/titles/Title";
import type { Servico } from "../dtos/Servico";

const chats = [
  {
    mensagens: [
      {
        isMeu: true,
        mensagem: "Oi, eu sou o a pessoa que tá escrevendo :sim:",
      },
      {
        isMeu: false,
        mensagem: "Oi, eu sou a pessoa que está enviando mensagens para você",
      },
      {
        isMeu: false,
        mensagem: "Mandei mais mensagens",
      },
      {
        isMeu: true,
        mensagem: "Boa",
      },
    ],
    destinario: "José Pires",
  },
  {
    mensagens: [
      {
        isMeu: true,
        mensagem: "Oi, estou em outro chat agora",
      },
      {
        isMeu: false,
        mensagem: "Legal",
      },
    ],
    destinario: "Professor Carvalho",
  },
];

const servico: Servico = {
  clienteId: 0,
  descricao: "",
  id: 0,
  isEntregue: false,
  nome: "Rebranding das Lojas Americanas",
  orcamentoIsAberto: true,
  prazo: "",
  valorMinimo: 0,
};

export const ChatServico = () => {
  const [mensagem, setMensagem] = useState<string>("");

  const [chat, setChat] = useState(chats[0]);

  const adicionarMensagem = () => {
    if (mensagem && mensagem.trim().length > 0) {
      setChat({
        ...chat,
        mensagens: [...chat.mensagens, { isMeu: true, mensagem: mensagem }],
      });

      setMensagem("");
    }
  };

  const trocarChat = (index: number) => {
    setChat(chats[index]);
  };

  return (
    <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
      <Title>{servico.nome}</Title>
      <div className="flex flex-1 min-h-0 border-t border-t-gray-300 divide-x divide-gray-300 mt-4">
        <section className="hidden md:flex flex-col w-80 min-h-0 overflow-y-auto p-4 gap-4">
          {chats.map((chat, index) => (
            <SelecaoServicoChat
              key={index}
              destinatario={chat.destinario}
              onClick={() => trocarChat(index)}
            />
          ))}
        </section>

        <section className="flex flex-1 min-h-0">
          <Chat
            mensagem={mensagem}
            setMensagem={setMensagem}
            adicionarMensagem={adicionarMensagem}
            mensagens={chat.mensagens}
            destinatario={chat.destinario}
          />
        </section>
      </div>
    </div>
  );
};
