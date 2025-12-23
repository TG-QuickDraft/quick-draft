import { useState } from "react";
import { adicionarUsuario, enviarFoto } from "@/api/usuario.api";

import Button from "@/components/Button";
import { LuSave } from "react-icons/lu";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

import Title from "@/components/Title";

import { criarUsuarioSchema } from "@/forms/criarUsuario.schema";
import Modal from "@/components/Modal";
import Input from "@/components/Inputs/Input";
import type { CriarUsuarioDTO } from "@/dtos/CriarUsuarioDTO";
import { TIPOS_USUARIO, type TipoUsuario } from "@/domain/enums/tiposUsuario";

export const CadastrarUsuario = () => {
  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [tipoUsuarioSelecionado, setTipoUsuarioSelecionado] =
    useState<TipoUsuario>(TIPOS_USUARIO[0] as TipoUsuario);

  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalStatus, setModalStatus] = useState<"Sucesso" | "Erro" | "">("");

  const enviar = async () => {
    const usuario = {
      nome: nome,
      cpf: cpf,
      email: email,
      senha: senha,
      confirmarSenha: confirmarSenha,
      tipoUsuario: tipoUsuarioSelecionado,
    } as CriarUsuarioDTO;

    try {
      await criarUsuarioSchema().validate(usuario);
    } catch (error) {
      if (error instanceof Error) {
        setModalStatus("Erro");
        setModalMsg(error.message);
        setShowModal(true);
      }

      return;
    }

    let usuarioAdicionado = await adicionarUsuario(usuario);

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
          placeholder="Seu nome"
          onChange={(e) => setNome(e.target.value)}
        />

        <Input placeholder="Seu CPF" onChange={(e) => setCpf(e.target.value)} />

        <Input
          type="email"
          placeholder="Seu e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Sua senha"
          onChange={(e) => setSenha(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Confirme sua senha"
          onChange={(e) => {
            setConfirmarSenha(e.target.value);
          }}
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

          {TIPOS_USUARIO.map((tipo, index) => (
            <label key={index} className="mx-4">
              {`${tipo} `}

              <Input
                type="radio"
                value={tipo}
                checked={tipoUsuarioSelecionado === tipo}
                onChange={() => {
                  setTipoUsuarioSelecionado(tipo as TipoUsuario);
                }}
              />
            </label>
          ))}
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
