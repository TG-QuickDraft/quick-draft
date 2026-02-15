import { useEffect, useState } from "react";

import Button from "@/components/common/Button";
import { LuSave } from "react-icons/lu";

import {
  adicionarContaBancaria,
  atualizarContaBancaria,
  consultarContaBancaria,
  consultarTiposConta,
} from "@/api/contaBancaria.api";
import Input from "@/components/common/Inputs/Input";
import Modal from "@/components/common/Modal";
import Title from "@/components/common/Title";
import type { CriarContaBancariaDTO } from "@/dtos/contaBancaria/CriarContaBancariaDTO";
import type { ContaBancariaDTO } from "@/dtos/contaBancaria/ContaBancariaDTO";
import type { TipoContaDTO } from "@/dtos/contaBancaria/TipoContaDTO";

export const CadastrarContaBancaria = () => {
  const [cpfTitular, setCpfTitular] = useState("");
  const [nomeTitular, setNomeTitular] = useState("");
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [numeroConta, setNumeroConta] = useState("");
  const [tipoContaId, setTipoContaId] = useState(0);

  const [tiposConta, setTiposConta] = useState<TipoContaDTO[]>([]);

  const [hasContaCadastrada, setHasContaCadastrada] = useState<boolean | null>(
    null,
  );

  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalStatus, setModalStatus] = useState<"Sucesso" | "Erro" | "">("");

  useEffect(() => {
    const obterDadosConta = async () => {
      try {
        const conta = await consultarContaBancaria();
        if (conta) {
          setHasContaCadastrada(true);
          setConta(conta);
        }
      } catch (error) {
        if (error instanceof Error) {
          setHasContaCadastrada(false);
        }
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

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Title>Cadastrar Conta Bancária</Title>

      <div className="flex flex-col w-1/2 gap-5 my-8 p-16 rounded-xl shadow-2xl border border-gray-600/20">
        <Input
          value={cpfTitular}
          onChange={(e) => setCpfTitular(e.target.value)}
          placeholder="CPF do titular"
        />

        <Input
          value={nomeTitular}
          onChange={(e) => setNomeTitular(e.target.value)}
          placeholder="Nome do titular"
        />

        <Input
          value={banco}
          onChange={(e) => setBanco(e.target.value)}
          placeholder="Banco"
        />

        <Input
          value={agencia}
          onChange={(e) => setAgencia(e.target.value)}
          placeholder="Agência"
        />

        <Input
          value={numeroConta}
          onChange={(e) => setNumeroConta(e.target.value)}
          placeholder="Nº da conta"
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

        {hasContaCadastrada === true && (
          <Button icon={<LuSave size={30} />} onClick={enviarAtualizarConta}>
            Atualizar
          </Button>
        )}

        {hasContaCadastrada === false && (
          <Button icon={<LuSave size={30} />} onClick={enviarNovaConta}>
            Salvar
          </Button>
        )}
      </div>

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
