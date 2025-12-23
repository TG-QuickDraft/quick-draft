import { useState } from "react";

import Button from "@/components/Button";

import Title from "@/components/Title";
import Input from "@/components/Inputs/Input";

import { CiLogin } from "react-icons/ci";
import InputGroup from "@/components/Inputs/InputGroup";
import { useForm } from "react-hook-form";

export const LoginUsuario = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const enviar = async () => {
    const { email, senha } = getValues();
    const login = {
      email: email,
      senha: senha,
    };
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Title>Login Usuário</Title>

      <div className="flex flex-col max-w-md w-full my-8 p-12 rounded-xl shadow-2xl border border-gray-600/20">
        <InputGroup>
          <h2>E-mail</h2>
          <Input
            type="email"
            placeholder="Digite o seu e-mail"
            {...register("email")}
          />
        </InputGroup>

        <InputGroup>
          <h2>Senha</h2>
          <Input
            type="password"
            placeholder="Digite a sua senha"
            {...register("senha")}
          />
        </InputGroup>

        <Button className="mt-2" icon={<CiLogin size={30} />} onClick={enviar}>
          Entrar
        </Button>
      </div>
    </div>
  );
};
