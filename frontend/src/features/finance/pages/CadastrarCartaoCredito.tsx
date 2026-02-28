import { useEffect, useState } from "react";

import Button from "@/shared/components/ui/Button";
import { LuSave } from "react-icons/lu";

import {
  adicionarCartaoCredito,
  atualizarCartaoCredito,
  consultarCartaoCredito,
  consultarBandeiras,
} from "@/features/finance/api/cartaoCredito.api";
import Input from "@/shared/components/ui/Inputs/Input";
import Modal from "@/shared/components/ui/Modal";
import Title from "@/shared/components/ui/Title";
import type { BandeiraCartaoCreditoDTO } from "@/features/finance/dtos/cartaoCredito/BandeiraCartaoCreditoDTO";
import type { CartaoCreditoDTO } from "@/features/finance/dtos/cartaoCredito/CartaoCreditoDTO";
import type { CriarCartaoCreditoDTO } from "@/features/finance/dtos/cartaoCredito/CriarCartaoCreditoDTO";
import { CardSchema, type ICardForm } from "../validations/finance.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Select from "@/shared/components/ui/Select";

export const CadastrarCartaoCredito = () => {
  const [bandeiras, setBandeiras] = useState<BandeiraCartaoCreditoDTO[]>([]);
  const [hasCartaoCadastrado, setHasCartaoCadastrado] =
    useState<boolean>(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalStatus, setModalStatus] = useState<"Sucesso" | "Erro" | "">("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
  } = useForm<ICardForm>({
    mode: "onChange",
    resolver: yupResolver(CardSchema),
    defaultValues: {
      flag: 1,
    },
  });

  useEffect(() => {
    const obterDadosCartao = async () => {
      const cartao = await consultarCartaoCredito();
      if (cartao) {
        setHasCartaoCadastrado(true);
        setValue("name", cartao.NomeImpresso);
        setValue("cvv", cartao.CodigoSeguranca);
        setValue("flag", cartao.BandeiraId);
      }
    };

    const obterBandeiras = async () => {
      const bandeiras = await consultarBandeiras();

      setBandeiras(bandeiras);
    };

    obterDadosCartao();
    obterBandeiras();
  }, []);

  const toCardDTO = (data: ICardForm): CriarCartaoCreditoDTO => {
    return {
      nomeImpresso: data.name,
      codigoSeguranca: data.cvv,
      bandeiraId: data.flag,
    };
  };

  const enviarNovoCartao = async (data: ICardForm) => {
    const cartao: CriarCartaoCreditoDTO = toCardDTO(data);

    try {
      await adicionarCartaoCredito(cartao);
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

  const enviarAtualizarConta = async (data: ICardForm) => {
    const cartao: CartaoCreditoDTO = {
      id: 0,
      ...toCardDTO(data),
    };

    try {
      await atualizarCartaoCredito(cartao);
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

  const cardFlag = watch("flag");
  const handleSelectChange = (value: number) => {
    setValue("flag", value);
    trigger("flag");
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center h-full">
      <Title>Cadastrar Cartão Crédito</Title>

      <form
        onSubmit={handleSubmit(
          hasCartaoCadastrado ? enviarAtualizarConta : enviarNovoCartao,
        )}
        className="flex flex-col w-1/2 gap-5 my-8 p-16 rounded-xl shadow-2xl border border-gray-600/20"
      >
        <Input
          placeholder="Nome Impresso"
          showErrorMsg
          error={errors?.name?.message}
          {...register("name")}
        />

        <Input
          placeholder="Código de Segurança"
          showErrorMsg
          error={errors?.cvv?.message}
          {...register("cvv")}
        />

        <div className="w-1/2">
          <p className="mb-4">Bandeira</p>

          <Select
            className="w-full"
            value={cardFlag ? String(cardFlag) : ""}
            onChange={(selectedValue) =>
              handleSelectChange(Number(selectedValue))
            }
            options={bandeiras.map((tipo) => ({
              value: String(tipo.id),
              label: tipo.nome,
            }))}
          />
        </div>

        <Button icon={<LuSave size={30} />}>
          {hasCartaoCadastrado ? "Atualizar" : "Salvar"}
        </Button>
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
