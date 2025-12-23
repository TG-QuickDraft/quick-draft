import type { Cliente } from "../models/Cliente";
import { adicionarUsuario } from "./usuarioApi";

const PATH = `${import.meta.env.VITE_API_URL}/api/Cliente`;

export const consultarClientePorId = async (id: number): Promise<Cliente> => {
  const resposta = await fetch(`${PATH}/${id}`);

  if (resposta.status !== 200) {
    throw new Error("Erro ao consultar cliente.");
  }

  return await resposta.json();
};

export const adicionarCliente = async (cliente: Cliente) => {
  const usuarioAdicionado = await adicionarUsuario(cliente);

  cliente.id = usuarioAdicionado.id;

  const option = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  };

  const resposta = await fetch(PATH, option);

  if (resposta.status !== 201) {
    throw new Error("Erro ao adicionar cliente.");
  }

  return resposta.json();
};
