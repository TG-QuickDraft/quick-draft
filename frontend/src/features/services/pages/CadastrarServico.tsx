import { useState } from "react";

import Button from "@/shared/components/ui/Button";
import { LuSave } from "react-icons/lu";

import Title from "@/shared/components/ui/Title";

import { adicionarServico } from "@/features/services/api/servico.api";
import type { CriarServicoDTO } from "@/features/services/dtos/CriarServicoDTO";
import Modal from "@/shared/components/ui/Modal";
import Input from "@/shared/components/ui/Inputs/Input";
import {
  NewServiceSchema,
  type INewServiceForm,
} from "../validations/services.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export const CadastrarServico = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalStatus, setModalStatus] = useState<"Sucesso" | "Erro" | "">("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<INewServiceForm>({
    mode: "onChange",
    resolver: yupResolver(NewServiceSchema),
  });

  const enviar = async (data: INewServiceForm) => {
    const servico: CriarServicoDTO = {
      nome: data.name,
      descricao: data.description,
    };

    try {
      await adicionarServico(servico);
      setModalStatus("Sucesso");
      setModalMsg("Serviço cadastrado com sucesso!");
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
    <div className="flex flex-1 flex-col items-center justify-center h-full">
      <Title>Cadastrar Serviço</Title>

      <form
        onClick={handleSubmit(enviar)}
        className="flex flex-col w-1/2 gap-5 my-8 p-16 rounded-xl shadow-2xl border border-gray-600/20"
      >
        <Input
          placeholder="Nome"
          showErrorMsg
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          placeholder="Descrição"
          showErrorMsg
          error={errors.description?.message}
          {...register("description")}
        />

        <Button icon={<LuSave size={30} />}>Salvar</Button>
      </form>

      <Modal
        show={showModal}
        title={modalStatus}
        onClose={() => setShowModal(false)}
      >
        {modalMsg}
      </Modal>
    </div>
  );
};
