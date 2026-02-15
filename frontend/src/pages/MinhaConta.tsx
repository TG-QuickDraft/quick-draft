import { atualizarSenha, consultarUsuario } from "@/api/usuario.api";
import Button from "@/components/common/ui/Button";

import Input from "@/components/common/ui/Inputs/Input";
import type { Usuario } from "@/domain/models/Usuario";
import { useEffect, useState } from "react";
import ProfilePhoto from "@/components/common/ui/ProfilePhoto";

export const MinhaConta = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const [novaSenha, setNovaSenha] = useState<string>("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState<string>("");

  useEffect(() => {
    const obterDadosUsuario = async () => {
      const dadosUsuario: Usuario = await consultarUsuario();

      setUsuario(dadosUsuario);
    };

    obterDadosUsuario();
  }, []);

  const submitEnviarSenha = async () => {
    try {
      const resposta = await atualizarSenha({
        novaSenha: novaSenha,
        confirmarNovaSenha: confirmarNovaSenha,
      });

      alert(resposta.mensagem);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="mt-12">
      <h1 className="text-2xl text-center mb-6">Página de Conta</h1>
      {usuario && (
        <div className="flex flex-col gap-3 items-center">
          <ProfilePhoto photoPath={usuario.fotoPerfilUrl} />
          <h2>Nome: {usuario.nome}</h2>
          <h3>Email: {usuario.email}</h3>
          <h3>CPF: {usuario.cpf}</h3>
        </div>
      )}
      <form className="flex flex-col gap-3 max-w-150 mx-auto mt-6">
        <label>Nome:</label>
        <Input type="text" value={usuario?.nome || ""} />

        <label>Email:</label>
        <Input type="email" value={usuario?.email || ""} />

        <label>CPF:</label>
        <Input type="text" value={usuario?.cpf || ""} />

        <div className="flex justify-center">
          <Button className="w-50 mt-2">Salvar</Button>
        </div>
      </form>

      <form className="flex flex-col gap-3 max-w-150 mx-auto mt-6">
        <label>Nova senha:</label>
        <Input
          name="senha"
          type="password"
          placeholder="Sua nova senha"
          onChange={(e) => setNovaSenha(e.target.value)}
        />

        <label>Confirmar senha:</label>
        <Input
          name="confirmarSenha"
          type="password"
          placeholder="Confirme sua nova senha"
          onChange={(e) => {
            setConfirmarNovaSenha(e.target.value);
          }}
        />

        <div className="flex justify-center">
          <Button
            className="w-50 mt-2"
            type={"button"}
            onClick={submitEnviarSenha}
          >
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
};
