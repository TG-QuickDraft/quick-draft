import { useState } from "react";

import Button from "@/shared/components/ui/buttons/Button";
import { LuSave } from "react-icons/lu";

import Title from "@/shared/components/ui/titles/Title";

import { adicionarServico } from "@/features/services/api/servico.api";
import type { CriarServicoDTO } from "@/features/services/dtos/CriarServicoDTO";
import Modal from "@/shared/components/ui/Modal";
import Input from "@/shared/components/ui/Inputs/Input";
import Radio from "@/shared/components/ui/Inputs/Radio";
import {
  NewServiceSchema,
  type INewServiceForm,
} from "../validations/services.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import DateInput from "@/shared/components/ui/Inputs/DateInput";

export const CadastrarServico = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalStatus, setModalStatus] = useState<"Sucesso" | "Erro" | "">("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<INewServiceForm>({
    mode: "onChange",
    resolver: yupResolver(NewServiceSchema),
  });

  const enviar = async (data: INewServiceForm) => {
    const servico: CriarServicoDTO = {
      nome: data.nome,
      descricao: data.descricao,
      orcamentoIsAberto: data.orcamentoIsAberto,
      valorMinimo: Number(data.valorMinimo),
      prazo: new Date(data.prazo).toISOString(),
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
        onSubmit={handleSubmit(enviar)}
        className="flex flex-col w-1/2 gap-5 my-8 p-16 rounded-xl shadow-2xl border border-gray-600/20"
      >
        <Input
          placeholder="Nome"
          showErrorMsg
          error={errors.nome?.message}
          {...register("nome")}
        />

        <Input
          placeholder="Descrição"
          showErrorMsg
          error={errors.descricao?.message}
          {...register("descricao")}
        />

        <Controller
          control={control}
          name="valorMinimo"
          render={({ field: { onChange, value, ref } }) => (
            <Input
              mask="currency"
              placeholder="R$ 00,00"
              error={errors?.valorMinimo?.message}
              showErrorMsg
              value={value}
              ref={ref}
              onCurrencyChange={(val) => {
                onChange(val ? Number(val) : null);
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="prazo"
          render={({ field }) => (
            <DateInput
              selectedDate={field.value ? new Date(field.value) : null}
              onChange={(date) => field.onChange(date)}
              error={errors?.prazo?.message}
              showErrorMsg
            />
          )}
        />

        <div>
          <h2 className="mb-5 text-[16px]">Orçamento</h2>

          <div className="flex gap-2 justify-evenly mb-4 border-y border-gray-600/20 py-5">
            <Radio
              value="true"
              label="Aberto"
              {...register("orcamentoIsAberto")}
            />

            <Radio
              value="false"
              label="Fechado"
              {...register("orcamentoIsAberto")}
            />
          </div>
        </div>

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
