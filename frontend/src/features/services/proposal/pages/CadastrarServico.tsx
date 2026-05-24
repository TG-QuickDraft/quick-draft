import Button from "@/shared/components/ui/buttons/Button";
import { LuSave } from "react-icons/lu";

import {
  adicionarServico,
  atualizarServico,
  consultarServicoPorId,
} from "@/features/services/proposal/api/servico.api";
import Input from "@/shared/components/ui/Inputs/Input";
import Radio from "@/shared/components/ui/Inputs/Radio";
import {
  NewServiceSchema,
  type INewServiceForm,
} from "../validations/services.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import DateInput from "@/shared/components/ui/Inputs/DateInput";
import { useModal } from "@/shared/contexts/modal.context";
import { proposalPaths } from "../routes/proposalPaths";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BackButton } from "@/shared/components/ui/buttons/BackButton";
import { clientePaths } from "@/features/clients/routes/clientePaths";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LOADING_TIMEOUT } from "@/shared/utils/loadingTimeout";
import Spinner from "@/shared/components/ui/Spinner";

export const CadastrarServico = () => {
  const { showSuccess, showError } = useModal();
  const [params] = useSearchParams();
  const serviceId = params.get("serviceId");
  const from = params.get("from");
  const { usuario } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<INewServiceForm>({
    mode: "onChange",
    resolver: yupResolver(NewServiceSchema),
  });

  useEffect(() => {
    if (serviceId) {
      const servico = async () => {
        let timer = setTimeout(() => setLoading(true), LOADING_TIMEOUT);
        try {
          const servico = await consultarServicoPorId(Number(serviceId));
          reset({
            nome: servico.nome,
            descricao: servico.descricao,
            orcamentoIsAberto: servico.orcamentoIsAberto,
            valorMinimo: servico.valorMinimo,
            prazo: new Date(servico.prazo),
          });
        } catch (error) {
          console.error(error);
        } finally {
          clearTimeout(timer);
          setLoading(false);
        }
      };
      servico();
    }
  }, [serviceId]);

  const enviar = async (data: INewServiceForm) => {
    try {
      if (serviceId) {
        await atualizarServico(Number(serviceId), {
          nome: data.nome,
          descricao: data.descricao,
          orcamentoIsAberto: data.orcamentoIsAberto,
          valorMinimo: Number(data.valorMinimo),
          prazo: new Date(data.prazo).toISOString(),
        });
        showSuccess({
          content: "Serviço atualizado com sucesso!",
          redirect: from
            ? from
            : clientePaths.perfilClienteById(usuario?.id || ""),
        });
      } else {
        await adicionarServico({
          nome: data.nome,
          descricao: data.descricao,
          orcamentoIsAberto: data.orcamentoIsAberto,
          valorMinimo: Number(data.valorMinimo),
          prazo: new Date(data.prazo).toISOString(),
        });
        showSuccess({
          content: "Serviço cadastrado com sucesso!",
          redirect: proposalPaths.pesquisaServico,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        showError({
          content: error.message,
        });
      }
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full">
      <BackButton>
        {serviceId ? "Editar Serviço" : "Cadastrar Serviço"}
      </BackButton>

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

        <Controller
          control={control}
          name="orcamentoIsAberto"
          render={({ field: { onChange, value } }) => (
            <div>
              <h2 className="mb-5 text-[16px]">Orçamento</h2>

              <div className="flex gap-2 justify-evenly mb-4 border-y border-gray-600/20 py-5">
                <Radio
                  label="Aberto"
                  checked={value === true}
                  onChange={() => onChange(true)}
                />

                <Radio
                  label="Fechado"
                  checked={value === false}
                  onChange={() => onChange(false)}
                />
              </div>
              {errors.orcamentoIsAberto?.message && (
                <span className="text-red-500 text-xs">
                  {errors.orcamentoIsAberto.message}
                </span>
              )}
            </div>
          )}
        />

        <Button icon={<LuSave size={30} />}>
          {serviceId ? "Salvar" : "Cadastrar"}
        </Button>
      </form>
    </div>
  );
};
