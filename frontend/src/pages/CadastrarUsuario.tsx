import { useState } from "react";
import { enviarFoto } from "../api/usuarioApi";
import { adicionarFreelancer } from "../api/freelancerApi";

import Button from "../components/Button";
import { LuSave } from "react-icons/lu";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

import Title from "../components/Title";
import { adicionarCliente } from "../api/clienteApi";
import { useValidacaoUsuario } from "../hooks/useValidacaoUsuario";
import Modal from "../components/Modal";
import Input from "../components/Input";

type TipoUsuario = "Freelancer" | "Cliente";

export const CadastrarUsuario = () => {

  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [tipoUsuarioSelecionado, setTipoUsuarioSelecionado] = useState<TipoUsuario>(
    "Freelancer"
  );

  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalStatus, setModalStatus] = useState<"Sucesso" | "Erro" | "">("");

  const enviar = async () => {

    const usuario = {
      id: 0,
      nome: nome,
    };

    try {
      await useValidacaoUsuario().validate(usuario);

    } catch (error) {

      if (error instanceof Error) {
        setModalStatus("Erro");
        setModalMsg(error.message);
        setShowModal(true);
      }

      return;
    }

    let usuarioAdicionado = null;

    switch (tipoUsuarioSelecionado) {
      case "Freelancer":
        usuarioAdicionado = await adicionarFreelancer(usuario);
        break;
      case "Cliente":
        usuarioAdicionado = await adicionarCliente(usuario);
        break;
      default:
        throw new Error("Tipo de usuário inválido.");
    }

    if (foto) {
      const form = new FormData();

      form.append("usuarioId", String(usuarioAdicionado.id));
      form.append("fotoPerfil", foto);

      await enviarFoto(form);
    }

    setModalStatus("Sucesso");
    setModalMsg("Usuário cadastrado com sucesso!");
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Title>Cadastrar Usuário</Title>

      <div className="flex flex-col w-1/2 gap-5 my-8 p-16 rounded-xl shadow-2xl border border-gray-600/20">
        <Input
          placeholder="nome"
          onChange={(e) => setNome(e.target.value)}
        />

        <Input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFoto(e.target.files[0]);
            }
          }}
        />

        <div>
          <h2>Tipo de Usuário</h2>

          {
            ["Freelancer", "Cliente"].map((tipo, index) => (
              <label key={index} className="mx-4">
                {`${tipo} `}

                <Input
                  type="radio"
                  value={tipo}
                  checked={tipoUsuarioSelecionado === tipo}
                  onChange= {() => {
                      setTipoUsuarioSelecionado(tipo as TipoUsuario);
                    }
                  }
                />
              </label>
            ))
          }
        </div>

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
