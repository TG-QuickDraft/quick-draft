import type { Cliente } from "../domain/models/Cliente";

const PATH = `${import.meta.env.VITE_API_URL}/api/cliente`;

export const consultarClientePorId = async (
  id: number,
): Promise<Cliente> => {
  const resposta = await fetch(`${PATH}/${id}`);

  if (resposta.status !== 200) {
    throw new Error("Erro ao consultar cliente.");
  }

  return await resposta.json();
};

