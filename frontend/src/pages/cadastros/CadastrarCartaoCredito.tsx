import { useEffect, useState } from "react";

import Button from "@/components/common/ui/Button";
import { LuSave } from "react-icons/lu";

import {
  adicionarCartaoCredito,
  atualizarCartaoCredito,
  consultarCartaoCredito,
  consultarBandeiras,
} from "@/api/cartaoCredito.api";
import Input from "@/components/common/ui/Inputs/Input";
import Modal from "@/components/common/ui/Modal";
import Title from "@/components/common/ui/Title";
import type { BandeiraCartaoCreditoDTO } from "@/dtos/cartaoCredito/BandeiraCartaoCreditoDTO";
import type { CartaoCreditoDTO } from "@/dtos/cartaoCredito/CartaoCreditoDTO";
import type { CriarCartaoCreditoDTO } from "@/dtos/cartaoCredito/CriarCartaoCreditoDTO";

export const CadastrarCartaoCredito = () => {
  const [nomeImpresso, setNomeImpresso] = useState("");
  const [codigoSeguranca, setCodigoSeguranca] = useState("");
  const [bandeiraId, setBandeiraId] = useState(0);

  const [bandeiras, setBandeiras] = useState<BandeiraCartaoCreditoDTO[]>([]);

  const [hasCartaoCadastrado, setHasCartaoCadastrado] = useState<boolean>(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalStatus, setModalStatus] = useState<"Sucesso" | "Erro" | "">("");

  useEffect(() => {
    const obterDadosCartao = async () => {
      const cartao = await consultarCartaoCredito();
      if (cartao) {
        setHasCartaoCadastrado(true);
        setCartao(cartao);
      }
    };

    const obterBandeiras = async () => {
      const bandeiras = await consultarBandeiras();

      setBandeiras([
        {
          id: 0,
          nome: "Selecione o tipo",
        },
        ...bandeiras,
      ]);
    };

    obterDadosCartao();
    obterBandeiras();
  }, []);

  const getCartao = (): CartaoCreditoDTO => {
    return {
      id: 0,
      nomeImpresso: nomeImpresso,
      codigoSeguranca: codigoSeguranca,
      bandeiraId: bandeiraId
    };
  };

  const setCartao = (cartao: CartaoCreditoDTO) => {
    setCodigoSeguranca(cartao.codigoSeguranca);
    setNomeImpresso(cartao.nomeImpresso);
    setBandeiraId(cartao.bandeiraId);
  };

  const enviarNovoCartao = async () => {
    const cartao: CriarCartaoCreditoDTO = getCartao();

    try {
      setCartao(await adicionarCartaoCredito(cartao));

      setModalStatus("Sucesso");
      setModalMsg("Cartão cadastrado com sucesso!");
      setShowModal(true);

      setHasCartaoCadastrado(true);
    } catch (error) {
      if (error instanceof Error) {
        setModalStatus("Erro");
        setModalMsg(error.message);
        setShowModal(true);
      }
    }
  };

  const enviarAtualizarConta = async () => {
    const cartao: CartaoCreditoDTO = getCartao();

    try {
      setCartao(await atualizarCartaoCredito(cartao));

      setModalStatus("Sucesso");
      setModalMsg("Cartão atualizado com sucesso!");
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
      <Title>Cadastrar Cartão Crédito</Title>

      <div className="flex flex-col w-1/2 gap-5 my-8 p-16 rounded-xl shadow-2xl border border-gray-600/20">
        <Input
          value={nomeImpresso}
          onChange={(e) => setNomeImpresso(e.target.value)}
          placeholder="Nome Impresso"
        />
        
        <Input
          value={codigoSeguranca}
          onChange={(e) => setCodigoSeguranca(e.target.value)}
          placeholder="Código de Segurança"
        />

        <label>
          <p>Bandeira</p>

          <select
            value={bandeiraId}
            onChange={(e) => setBandeiraId(Number(e.target.value))}
          >
            {bandeiras.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nome}
              </option>
            ))}
          </select>
        </label>

        {hasCartaoCadastrado === true && (
          <Button icon={<LuSave size={30} />} onClick={enviarAtualizarConta}>
            Atualizar
          </Button>
        )}

        {hasCartaoCadastrado === false && (
          <Button icon={<LuSave size={30} />} onClick={enviarNovoCartao}>
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
