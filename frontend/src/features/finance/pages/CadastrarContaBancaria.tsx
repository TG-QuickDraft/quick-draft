import { useEffect, useState } from "react";

import Button from "@/shared/components/ui/buttons/Button";
import { LuSave } from "react-icons/lu";

import {
  adicionarContaBancaria,
  atualizarContaBancaria,
  consultarContaBancaria,
  consultarTiposConta,
} from "@/features/finance/api/contaBancaria.api";
import Input from "@/shared/components/ui/Inputs/Input";
import Title from "@/shared/components/ui/titles/Title";
import type { CriarContaBancariaDTO } from "@/features/finance/dtos/contaBancaria/CriarContaBancariaDTO";
import type { ContaBancariaDTO } from "@/features/finance/dtos/contaBancaria/ContaBancariaDTO";
import type { TipoContaDTO } from "@/features/finance/dtos/contaBancaria/TipoContaDTO";
import {
  BankAccountSchema,
  type IBankAccountForm,
} from "../validations/finance.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Select from "@/shared/components/ui/Select";
import { useModal } from "@/shared/contexts/modal.context";
import { usuarioPaths } from "@/features/users/routes/usuarioPaths";

export const CadastrarContaBancaria = () => {
  const { showSuccess, showError } = useModal();

  const [tiposConta, setTiposConta] = useState<TipoContaDTO[]>([]);
  const [hasContaCadastrada, setHasContaCadastrada] = useState<boolean>(false);

  useEffect(() => {
    const obterDadosConta = async () => {
      const conta: ContaBancariaDTO = await consultarContaBancaria();
      if (conta) {
        setHasContaCadastrada(true);
        setValue("cpf", conta.cpfTitular);
        setValue("nomeTitular", conta.nomeTitular);
        setValue("banco", conta.banco);
        setValue("agencia", conta.agencia);
        setValue("numeroConta", conta.numeroConta);
        setValue("tipoConta", conta.tipoContaId);
      }
    };

    const obterTiposConta = async () => {
      const tiposConta = await consultarTiposConta();
      setTiposConta(tiposConta);
    };

    obterDadosConta();
    obterTiposConta();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<IBankAccountForm>({
    mode: "onChange",
    resolver: yupResolver(BankAccountSchema),
    defaultValues: {
      tipoConta: 1,
    },
  });

  const toCriarContaDTO = (form: IBankAccountForm): CriarContaBancariaDTO => {
    return {
      cpfTitular: form.cpf,
      nomeTitular: form.nomeTitular,
      banco: form.banco,
      agencia: form.agencia,
      numeroConta: form.numeroConta,
      tipoContaId: form.tipoConta,
    };
  };

  const enviarNovaConta = async (data: IBankAccountForm) => {
    const conta: CriarContaBancariaDTO = toCriarContaDTO(data);
    try {
      await adicionarContaBancaria(conta);
      showSuccess({
        content: "Conta cadastrada com sucesso!",
        redirect: usuarioPaths.minhaConta,
      });

      setHasContaCadastrada(true);
    } catch (error) {
      if (error instanceof Error) {
        showError({ content: error.message });
      }
    }
  };

  const enviarAtualizarConta = async (data: IBankAccountForm) => {
    const conta: ContaBancariaDTO = {
      id: 0,
      ...toCriarContaDTO(data),
    };

    try {
      await atualizarContaBancaria(conta);
      showSuccess({
        content: "Conta atualizada com sucesso!",
        redirect: usuarioPaths.minhaConta,
      });
    } catch (error) {
      if (error instanceof Error) {
        showError({ content: error.message });
      }
    }
  };

  const tipoContaSelecionada = watch("tipoConta");
  const handleSelectChange = (value: number) => {
    setValue("tipoConta", value);
    trigger("tipoConta");
  };

  return (
    <form
      onSubmit={handleSubmit(
        hasContaCadastrada ? enviarAtualizarConta : enviarNovaConta,
      )}
      className="flex flex-1 flex-col items-center justify-center h-full"
    >
      <Title>Cadastrar Conta Bancária</Title>

      <div className="flex flex-col w-1/2 gap-5 my-8 p-16 rounded-xl shadow-2xl border border-gray-600/20">
        <Input
          placeholder="CPF do titular"
          showErrorMsg
          error={errors.cpf?.message}
          {...register("cpf")}
          mask="000.000.000-00"
        />

        <Input
          placeholder="Nome do titular"
          showErrorMsg
          error={errors?.nomeTitular?.message}
          {...register("nomeTitular")}
        />

        <Input
          placeholder="Banco"
          showErrorMsg
          error={errors?.banco?.message}
          {...register("banco")}
        />

        <Input
          placeholder="Agência"
          showErrorMsg
          error={errors?.agencia?.message}
          {...register("agencia")}
        />

        <Input
          placeholder="Nº da conta"
          showErrorMsg
          error={errors?.numeroConta?.message}
          {...register("numeroConta")}
        />

        <div className="flex flex-col gap-4 w-1/2">
          <p>Tipo de Conta</p>
          <Select
            className="w-full"
            value={tipoContaSelecionada ? String(tipoContaSelecionada) : ""}
            onChange={(selectedValue) =>
              handleSelectChange(Number(selectedValue))
            }
            options={tiposConta.map((tipo) => ({
              value: String(tipo.id),
              label: tipo.nome,
            }))}
          />
        </div>

        <Button icon={<LuSave size={30} />}>
          {hasContaCadastrada ? "Atualizar" : "Salvar"}
        </Button>
      </div>
    </form>
  );
};
