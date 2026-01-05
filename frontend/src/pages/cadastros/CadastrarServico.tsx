import { useState } from "react";

import Button from "@/components/common/Button";
import { LuSave } from "react-icons/lu";

import Title from "@/components/common/Title";

import { adicionarServico } from "@/api/servico.api";
import type { CriarServicoDTO } from "@/dtos/CriarServicoDTO";
import Modal from "@/components/common/Modal";

export const CadastrarServico = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalStatus, setModalStatus] = useState<"Sucesso" | "Erro" | "">("");

  const enviar = async () => {
    const servico: CriarServicoDTO = {
      nome: nome,
      descricao: descricao,
    };

    try {
      await adicionarServico(servico);
    } catch (error){
      if (error instanceof Error) {
        setModalStatus("Erro");
        setModalMsg(error.message);
        setShowModal(true);
      }
    }

    setModalStatus("Sucesso");
    setModalMsg("Serviço cadastrado com sucesso!");
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Title>Cadastrar Serviço</Title>

      <div className="flex flex-col w-1/2 gap-5 my-8 p-16 rounded-xl shadow-2xl border border-gray-600/20">
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

      <Modal
        show={showModal}
        title={modalStatus}
        onClose={() => setShowModal(false)}
      >
        {modalMsg}
      </Modal>
    </div>
  );
};
