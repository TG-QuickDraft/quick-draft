import Button from "@/shared/components/ui/buttons/Button";
import Title from "@/shared/components/ui/titles/Title";
import Input from "@/shared/components/ui/Inputs/Input";
import InputGroup from "@/shared/components/ui/Inputs/InputGroup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";

import {
  AccountSchema,
  type IAccountForm,
} from "../validations/account.schema";

import {
  atualizarDadosUsuario,
  consultarUsuario,
} from "@/features/users/api/usuario.api";

import { CiUser } from "react-icons/ci";
import { useModal } from "@/shared/contexts/model.context";
import { usuarioPaths } from "../routes/usuarioPaths";

export const AtualizarDadosUsuario = () => {
  const { showSuccess, showError } = useModal();

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<IAccountForm>({
    mode: "onChange",
    resolver: yupResolver(AccountSchema),
  });

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const usuario = await consultarUsuario();

        setValue("nome", usuario.nome);
        setValue("email", usuario.email);
        setValue("cpf", usuario.cpf);
      } catch (error) {
        showError({ content: "Erro ao carregar dados do usuário." });
      } finally {
        setLoading(false);
      }
    };

    carregarUsuario();
  }, [reset]);

  const enviar = async (data: IAccountForm) => {
    try {
      const resposta = await atualizarDadosUsuario({
        nome: data.nome,
        email: data.email,
        cpf: data.cpf,
      });

      showSuccess({
        content: resposta.mensagem,
        redirect: usuarioPaths.minhaConta,
      });
    } catch (error) {
      if (error instanceof Error) {
        showError({
          content: error.message,
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <p>Carregando dados...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center h-full">
        <form
          onSubmit={handleSubmit(enviar)}
          className="flex flex-col max-w-md w-full my-8 p-12 rounded-xl shadow-2xl border border-gray-600/20"
        >
          <Title className="mb-6">Editar Dados</Title>

          <InputGroup>
            <h2>Nome</h2>
            <Input
              type="text"
              showErrorMsg
              error={errors.nome?.message}
              placeholder="Digite seu nome"
              {...register("nome")}
            />
          </InputGroup>

          <InputGroup>
            <h2>E-mail</h2>
            <Input
              type="email"
              showErrorMsg
              error={errors.email?.message}
              placeholder="Digite seu e-mail"
              {...register("email")}
            />
          </InputGroup>

          <InputGroup>
            <h2>CPF</h2>
            <Input
              type="text"
              showErrorMsg
              error={errors.cpf?.message}
              placeholder="Digite seu CPF"
              {...register("cpf")}
              mask="000.000.000-00"
            />
          </InputGroup>

          <Button type="submit" icon={<CiUser size={24} />}>
            Atualizar Dados
          </Button>
        </form>
      </div>
    </>
  );
};

export default AtualizarDadosUsuario;
