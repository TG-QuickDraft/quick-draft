import { useState } from "react";
import { enviarFoto } from "../api/usuarioApi";
import { adicionarFreelancer } from "../api/freelancerApi";

import Button from "../components/Button";
import { LuSave } from "react-icons/lu";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

import Title from "../components/Title";
import Modal from "../components/Modal";
import Input from "../components/Input";

export const CadastrarFreelancer = () => {
  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalStatus, setModalStatus] = useState<"Sucesso" | "Erro" | "">("");

  const enviar = async () => {
    if (!nome || !foto) {
      setModalStatus("Erro");
      setModalMsg("Preencha todos os campos");
      setShowModal(true);
      return;
    }

    const freelancerAdicionado = await adicionarFreelancer({
      id: 0,
      nome: nome,
    });

    const form = new FormData();

    if (foto) {
      form.append("Id", String(freelancerAdicionado.id));
      form.append("FotoPerfil", foto);

      const resposta = await enviarFoto(form);

      console.log(await resposta.json());
    }

    setModalStatus("Sucesso");
    setModalMsg("Freelancer cadastrado com sucesso!");
    setShowModal(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <Title>Cadastrar Freelancer</Title>
        <div className="flex flex-col w-1/2 gap-5 my-8 p-16 rounded-xl shadow-2xl border border-gray-500/20">
          <Input
            placeholder="Nome"
            onChange={(e: any) => setNome(e.target.value)}
          />
          <Input
            type="file"
            onChange={(e: any) => {
              if (e.target.files && e.target.files[0]) {
                setFoto(e.target.files[0]);
              }
            }}
          />
          <Button icon={<LuSave size={30} />} onClick={enviar}>
            Salvar
          </Button>
        </div>
        <Link to={"/"}>
          <Button icon={<MdKeyboardDoubleArrowLeft size={30} />}>Voltar</Button>
        </Link>
        {foto && (
          <div className="pt-6">
            <img
              src={foto ? URL.createObjectURL(foto) : ""}
              alt="Preview"
              style={{ width: 200, height: "auto", marginTop: 10 }}
            />
          </div>
        )}
      </div>

      <Modal
        show={showModal}
        title={modalStatus}
        onClose={() => setShowModal(false)}
      >
        {modalMsg}
      </Modal>
    </>
  );
};
