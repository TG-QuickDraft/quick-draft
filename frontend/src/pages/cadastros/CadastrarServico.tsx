import { useState } from "react";

import Button from "@/components/common/Button";
import { LuSave } from "react-icons/lu";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

import Title from "@/components/common/Title";

import { adicionarServico } from "@/api/servico.api";

export const CadastrarServico = () => {
  const [clienteId, setClienteId] = useState(0);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const enviar = async () => {
    const servico = {
      id: 0,
      clienteId: clienteId,
      nome: nome,
      descricao: descricao,
    };

    await adicionarServico(servico);

    alert("Serviço cadastrado com sucesso!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Title>Cadastrar Serviço</Title>

      <div className="flex flex-col w-1/2 gap-5 my-8 p-16 rounded-xl shadow-2xl border border-gray-600/20">
        <input
          className="border border-gray-600 w-full p-3 focus:outline-none rounded"
          placeholder="Id do cliente tirar depois PFV"
          type="number"
          onChange={(e) => setClienteId(Number(e.target.value))}
        />

        <input
          className="border border-gray-600 w-full p-3 focus:outline-none rounded"
          placeholder="Nome"
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          className="border border-gray-600 w-full p-3 focus:outline-none rounded"
          placeholder="Descrição"
          onChange={(e) => setDescricao(e.target.value)}
        />

        <Button icon={<LuSave size={30} />} onClick={enviar}>
          Salvar
        </Button>
      </div>

      <Link to={"/"}>
        <Button icon={<MdKeyboardDoubleArrowLeft size={30} />}>Voltar</Button>
      </Link>
    </div>
  );
};
