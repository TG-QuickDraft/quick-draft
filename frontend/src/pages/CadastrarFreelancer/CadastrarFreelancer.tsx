import { useState } from "react";
import { enviarFoto } from "../../api/usuarioApi";
import { adicionarFreelancer } from "../../api/freelancerApi";

import Button from "../../components/Button";
import { LuSave } from "react-icons/lu";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

import Title from "../../components/Title";

export const CadastrarFreelancer = () => {
  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState<File | null>(null);

  const enviar = async () => {
    const freelancerAdicionado = await adicionarFreelancer({
      id: 0,
      nome: nome,
    });

    console.log(freelancerAdicionado);

    const form = new FormData();

    if (foto) {
      form.append("Id", String(freelancerAdicionado.id));
      form.append("FotoPerfil", foto);

      const resposta = await enviarFoto(form);

      console.log(await resposta.json());
    }

    alert("Freelancer cadastrado com sucesso!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Title>Cadastrar Freelancer</Title>

      <div className="flex flex-col w-1/2 gap-5 my-8 p-16 rounded-[20px] shadow-2xl border border-gray-600/20">
        <input
          className="border border-gray-600 w-full p-3 focus:outline-none rounded"
          placeholder="Nome"
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
