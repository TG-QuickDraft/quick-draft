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

type TipoUsuario = "Freelancer" | "Cliente";

export const CadastrarUsuario = () => {

  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [tipoUsuarioSelecionado, setTipoUsuarioSelecionado] = useState<TipoUsuario>(
    "Freelancer"
  );

  const enviar = async () => {

    const usuario = {
      id: 0,
      nome: nome,
    };

    try {
      await useValidacaoUsuario().validate(usuario);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
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

    alert("Usuário cadastrado com sucesso!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Title>Cadastrar Usuário</Title>

      <div className="flex flex-col w-1/2 gap-5 my-8 p-16 rounded-xl shadow-2xl border border-gray-600/20">
        <input
          className="border border-gray-600 w-full p-3 focus:outline-none rounded"
          placeholder="nome"
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          className="border border-gray-600 p-3 rounded"
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

                <input
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
    </div>
  );
};
