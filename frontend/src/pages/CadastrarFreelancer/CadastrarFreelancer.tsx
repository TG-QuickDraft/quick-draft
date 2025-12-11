import { useState } from "react";
import { enviarFoto } from "../../api/usuarioApi";
import { adicionarFreelancer } from "../../api/freelancerApi";

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
    <div>
      <h1>Cadastrar Freelancer</h1>

      <div>
        <input placeholder="Nome" onChange={(e) => setNome(e.target.value)} />

        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFoto(e.target.files[0]);
            }
          }}
        />

        <button onClick={enviar}>Salvar</button>
      </div>

      {foto ? (
        <img
          src={foto ? URL.createObjectURL(foto) : ""}
          alt="Preview"
          style={{ width: 200, height: "auto", marginTop: 10 }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
