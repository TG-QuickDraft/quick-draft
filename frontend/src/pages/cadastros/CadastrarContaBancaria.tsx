import { useState } from "react";

import Button from "@/components/common/Button";
import { LuSave } from "react-icons/lu";

import { adicionarContaBancaria } from "@/api/contaBancaria.api";
import Input from "@/components/common/Inputs/Input";
import Modal from "@/components/common/Modal";
import Title from "@/components/common/Title";
import type { CriarContaBancariaDTO } from "@/dtos/contaBancaria/CriarContaBancariaDTO";

export const CadastrarContaBancaria = () => {
  const [cpfTitular, setCpfTitular] = useState("");
  const [nomeTitular, setNomeTitular] = useState("");
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [numeroConta, setNumeroConta] = useState("");
  const [tipoConta, setTipoConta] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalStatus, setModalStatus] = useState<"Sucesso" | "Erro" | "">("");

  const enviar = async () => {
    const conta: CriarContaBancariaDTO = {
      cpfTitular: cpfTitular,
      nomeTitular: nomeTitular,
      banco: banco,
      agencia: agencia,
      numeroConta: numeroConta,
      tipoConta: tipoConta
    };

    try {
      const contaAdicionada = await adicionarContaBancaria(conta);

      setModalStatus("Sucesso");
      setModalMsg("Conta cadastrada com sucesso!");
      setShowModal(true);

    } catch (error){

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
          placeholder="CPF do titular"
          onChange={(e) => setCpfTitular(e.target.value)}
        />

        <Input
          placeholder="Nome do titular"
          onChange={(e) => setNomeTitular(e.target.value)}
        />
        
        <Input
          placeholder="Banco"
          onChange={(e) => setBanco(e.target.value)}
        />

        <Input
          placeholder="Agência"
          onChange={(e) => setAgencia(e.target.value)}
        />

        <Input
          placeholder="Nº da conta"
          onChange={(e) => setNumeroConta(e.target.value)}
        />

        <label>
          <p>Tipo de Conta</p>

          <select 
            value={tipoConta} 
            onChange={(e) => setTipoConta(e.target.value)}
          >
            <option value="">Selecione o tipo</option>
            <option value="CORRENTE">Conta Corrente</option>
            <option value="POUPANCA">Conta Poupança</option>
          </select>
        </label>

        <Button icon={<LuSave size={30} />} onClick={enviar}>
          Salvar
        </Button>
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
