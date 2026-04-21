import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import type { MensagemDTO } from "../dtos/MensagemDTO";

export const useChatConnection = (servicoId: number) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null,
  );
  const [incomingMessage, setIncomingMessage] = useState<MensagemDTO | null>(
    null,
  );

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_URL}/chat-hub`, {
        accessTokenFactory() {
          const token = localStorage.getItem("token");
          return token ? token : "";
        },
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      const startConnection = async () => {
        try {
          await connection.start();
          await connection.invoke("JoinChat", servicoId.toString());

          connection.on("ReceiveMessage", (message: MensagemDTO) => {
            setIncomingMessage(message);
          });
        } catch (error) {
          console.error("SignalR Connection Error: ", error);
        }
      };

      startConnection();

      return () => {
        connection.stop();
      };
    }
  }, [connection, servicoId]);

  return { incomingMessage };
};
