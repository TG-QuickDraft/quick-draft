import { useState } from "react";

import Button from "@/components/common/Button";
import { LuSave } from "react-icons/lu";

import Title from "@/components/common/Title";

import Modal from "@/components/common/Modal";
import type { CriarProjetoFreelancerDTO } from "@/dtos/projetoFreelancer/CriarProjetoFreelancerDTO";
import { adicionarProjetoFreelancer, enviarImagemProjeto } from "@/api/projetoFreelancer.api";
import Input from "@/components/common/Inputs/Input";

export const CadastrarProjetoFreelancer = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [link, setLink] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalStatus, setModalStatus] = useState<"Sucesso" | "Erro" | "">("");

  const enviar = async () => {
    const projeto: CriarProjetoFreelancerDTO = {
      nome: nome,
      descricao: descricao,
      link: link
    };

    try {
      const projetoAdicionado = await adicionarProjetoFreelancer(projeto);
      
      if (imagem && projetoAdicionado) {
        const form = new FormData();

        form.append("imagem", imagem);

        await enviarImagemProjeto(form, projetoAdicionado.id);
      }

    } catch (error){

      if (error instanceof Error) {
        setModalStatus("Erro");
        setModalMsg(error.message);
        setShowModal(true);

        return;
      }
    }

    setModalStatus("Sucesso");
    setModalMsg("Projeto cadastrado com sucesso!");
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Title>Cadastrar Projeto</Title>

      <div className="flex flex-col w-1/2 gap-5 my-8 p-16 rounded-xl shadow-2xl border border-gray-600/20">
        <Input
          placeholder="Nome"
          onChange={(e) => setNome(e.target.value)}
        />

        <Input
          placeholder="Descrição"
          onChange={(e) => setDescricao(e.target.value)}
        />
        
        <Input
          placeholder="Link"
          onChange={(e) => setLink(e.target.value)}
        />

        <Input
          name="imagem"
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImagem(e.target.files[0]);
            }
          }}
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
