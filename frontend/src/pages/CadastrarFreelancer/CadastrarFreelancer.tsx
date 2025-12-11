import { useState } from "react";
import { enviarFoto } from "../../api/usuarioApi";
import { adicionarFreelancer } from "../../api/freelancerApi";

import Button from "../../components/Button";
import { LuSave } from "react-icons/lu";
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
    <div className="flex flex-col items-center gap-5 justify-center h-full">
      <h1>Cadastrar Freelancer</h1>

      <div className="flex flex-col w-1/2 gap-5">
        <input
          className="border w-full p-3 focus:outline-none rounded"
          placeholder="Nome"
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          className="border p-3 rounded"
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

      {foto && (
        <img
          src={foto ? URL.createObjectURL(foto) : ""}
          alt="Preview"
          style={{ width: 200, height: "auto", marginTop: 10 }}
        />
      )}
    </div>
  );
};
