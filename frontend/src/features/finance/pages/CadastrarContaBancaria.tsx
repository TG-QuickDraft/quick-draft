import { useEffect, useState } from "react";

import Button from "@/shared/components/ui/Button";
import { LuSave } from "react-icons/lu";

import {
  adicionarContaBancaria,
  atualizarContaBancaria,
  consultarContaBancaria,
  consultarTiposConta,
} from "@/features/finance/api/contaBancaria.api";
import Input from "@/shared/components/ui/Inputs/Input";
import Modal from "@/shared/components/ui/Modal";
import Title from "@/shared/components/ui/Title";
import type { CriarContaBancariaDTO } from "@/features/finance/dtos/contaBancaria/CriarContaBancariaDTO";
import type { ContaBancariaDTO } from "@/features/finance/dtos/contaBancaria/ContaBancariaDTO";
import type { TipoContaDTO } from "@/features/finance/dtos/contaBancaria/TipoContaDTO";
import {
  BankAccountSchema,
  type IBankAccountForm,
} from "../validations/finance.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export const CadastrarContaBancaria = () => {
  const [cpfTitular, setCpfTitular] = useState("");
  const [nomeTitular, setNomeTitular] = useState("");
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [numeroConta, setNumeroConta] = useState("");
  const [tipoContaId, setTipoContaId] = useState(0);

  const [tiposConta, setTiposConta] = useState<TipoContaDTO[]>([]);

  const [hasContaCadastrada, setHasContaCadastrada] = useState<boolean>(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalStatus, setModalStatus] = useState<"Sucesso" | "Erro" | "">("");

  useEffect(() => {
    const obterDadosConta = async () => {
      const conta = await consultarContaBancaria();
      if (conta) {
        setHasContaCadastrada(true);
        setConta(conta);
      }
    };

    const obterTiposConta = async () => {
      const tiposConta = await consultarTiposConta();

      setTiposConta([
        {
          id: 0,
          nome: "Selecione o tipo",
        },
        ...tiposConta,
      ]);
    };

    obterDadosConta();
    obterTiposConta();
  }, []);

  const getConta = (): ContaBancariaDTO => {
    return {
      id: 0,
      cpfTitular: cpfTitular,
      nomeTitular: nomeTitular,
      banco: banco,
      agencia: agencia,
      numeroConta: numeroConta,
      tipoContaId: tipoContaId,
    };
  };

  const setConta = (conta: ContaBancariaDTO) => {
    setCpfTitular(conta.cpfTitular);
    setNomeTitular(conta.nomeTitular);
    setBanco(conta.banco);
    setAgencia(conta.agencia);
    setNumeroConta(conta.numeroConta);
    setTipoContaId(conta.tipoContaId);
  };

  const enviarNovaConta = async () => {
    const conta: CriarContaBancariaDTO = getConta();

    try {
      setConta(await adicionarContaBancaria(conta));

      setModalStatus("Sucesso");
      setModalMsg("Conta cadastrada com sucesso!");
      setShowModal(true);

      setHasContaCadastrada(true);
    } catch (error) {
      if (error instanceof Error) {
        setModalStatus("Erro");
        setModalMsg(error.message);
        setShowModal(true);
      }
    }
  };

  const enviarAtualizarConta = async () => {
    const conta: ContaBancariaDTO = getConta();

    try {
      setConta(await atualizarContaBancaria(conta));

      setModalStatus("Sucesso");
      setModalMsg("Conta atualizada com sucesso!");
      setShowModal(true);
    } catch (error) {
      if (error instanceof Error) {
        setModalStatus("Erro");
        setModalMsg(error.message);
        setShowModal(true);
      }
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IBankAccountForm>({
    mode: "onChange",
    resolver: yupResolver(BankAccountSchema),
  });

  useEffect(() => {
    setValue("cpf", cpfTitular);
    setValue("nomeTitular", nomeTitular);
    setValue("banco", banco);
    setValue("agencia", agencia);
    setValue("numeroConta", numeroConta);
  }, []);

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

        <label>
          <p>Tipo de Conta</p>

          <select
            value={tipoContaId}
            onChange={(e) => setTipoContaId(Number(e.target.value))}
          >
            {tiposConta.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nome}
              </option>
            ))}
          </select>
        </label>

        <Button icon={<LuSave size={30} />}>
          {hasContaCadastrada ? "Atualizar" : "Salvar"}
        </Button>
      </div>

      <Modal
        show={showModal}
        title={modalStatus}
        onClose={() => setShowModal(false)}
      >
        {modalMsg}
      </Modal>
    </form>
  );
};
