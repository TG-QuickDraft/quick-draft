import Button from "@/shared/components/ui/Button";
import Title from "@/shared/components/ui/titles/Title";
import Input from "@/shared/components/ui/Inputs/Input";
import InputGroup from "@/shared/components/ui/Inputs/InputGroup";
import Modal from "@/shared/components/ui/Modal";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import {
  ChangePasswordSchema,
  type IChangePasswordForm,
} from "../validations/account.schema";

import { atualizarSenha } from "@/features/users/api/usuario.api";
import { CiLock } from "react-icons/ci";

export const AtualizarSenha = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<"Sucesso" | "Erro" | "">("");
  const [modalMsg, setModalMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePasswordForm>({
    mode: "onChange",
    resolver: yupResolver(ChangePasswordSchema),
  });

  const enviar = async (data: IChangePasswordForm) => {
    try {
      const resposta = await atualizarSenha({
        novaSenha: data.password,
        confirmarNovaSenha: data.confirmPassword,
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

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center h-full">
        <form
          onSubmit={handleSubmit(enviar)}
          className="flex flex-col max-w-md w-full my-8 p-12 rounded-xl shadow-2xl border border-gray-600/20"
        >
          <Title className="mb-6">Atualizar Senha</Title>

          <InputGroup>
            <h2>Nova Senha</h2>
            <Input
              type="password"
              showErrorMsg
              error={errors.password?.message}
              placeholder="Digite sua nova senha"
              {...register("password")}
            />
          </InputGroup>

          <InputGroup>
            <h2>Confirmar Nova Senha</h2>
            <Input
              type="password"
              showErrorMsg
              error={errors.confirmPassword?.message}
              placeholder="Confirme sua nova senha"
              {...register("confirmPassword")}
            />
          </InputGroup>

          <Button type="submit" icon={<CiLock size={24} />}>
            Atualizar Senha
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

export default AtualizarSenha;