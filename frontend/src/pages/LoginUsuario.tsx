import { useState } from "react";;

import Button from "../components/Button";
import { LuSave } from "react-icons/lu";

import Title from "../components/Title";
import Input from "../components/Input";

export const LoginUsuario = () => {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const enviar = async () => {
    const login = {
      email: email,
      senha: senha
    };
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Title>Login Usuário</Title>

      <div className="flex flex-col w-1/2 gap-5 my-8 p-16 rounded-xl shadow-2xl border border-gray-600/20">
        <Input
          type="email"
          placeholder="Seu e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Sua senha"
          onChange={(e) => {setSenha(e.target.value)}}
        />

        <Button icon={<LuSave size={30} />} onClick={enviar}>
          Login
        </Button>
      </div>
    </div>
  );
};
