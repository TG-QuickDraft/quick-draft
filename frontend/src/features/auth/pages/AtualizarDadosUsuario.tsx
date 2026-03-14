import Button from "@/shared/components/ui/Button";
import Title from "@/shared/components/ui/titles/Title";
import Input from "@/shared/components/ui/Inputs/Input";
import InputGroup from "@/shared/components/ui/Inputs/InputGroup";
import Modal from "@/shared/components/ui/Modal";

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

export const AtualizarDadosUsuario = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<"Sucesso" | "Erro" | "">("");
  const [modalMsg, setModalMsg] = useState("");
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
        setModalStatus("Erro");
        setModalMsg("Erro ao carregar dados do usuário.");
        setShowModal(true);
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

      setModalStatus("Sucesso");
      setModalMsg(resposta.mensagem);
      setShowModal(true);
    } catch (error) {
      if (error instanceof Error) {
        setModalStatus("Erro");
        setModalMsg(error.message);
        setShowModal(true);
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

      <Modal
        show={showModal}
        title={modalStatus}
        onClose={() => setShowModal(false)}
      >
        {modalMsg}
      </Modal>
    </>
  );
};

export default AtualizarDadosUsuario;
