import { useEffect, useState } from "react";

import Button from "@/shared/components/ui/buttons/Button";
import { LuSave } from "react-icons/lu";

import {
  adicionarCartaoCredito,
  atualizarCartaoCredito,
  consultarCartaoCredito,
  consultarBandeiras,
} from "@/features/finance/api/cartaoCredito.api";
import Input from "@/shared/components/ui/Inputs/Input";
import Title from "@/shared/components/ui/titles/Title";
import type { BandeiraCartaoCreditoDTO } from "@/features/finance/dtos/cartaoCredito/BandeiraCartaoCreditoDTO";
import type { CartaoCreditoDTO } from "@/features/finance/dtos/cartaoCredito/CartaoCreditoDTO";
import type { CriarCartaoCreditoDTO } from "@/features/finance/dtos/cartaoCredito/CriarCartaoCreditoDTO";
import { CardSchema, type ICardForm } from "../validations/finance.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Select from "@/shared/components/ui/Select";
import { useModal } from "@/shared/contexts/modal.context";
import { usuarioPaths } from "@/features/users/routes/usuarioPaths";

export const CadastrarCartaoCredito = () => {
  const { showError, showSuccess } = useModal();

  const [bandeiras, setBandeiras] = useState<BandeiraCartaoCreditoDTO[]>([]);
  const [hasCartaoCadastrado, setHasCartaoCadastrado] =
    useState<boolean>(false);

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
      const cartao: CriarCartaoCreditoDTO = await consultarCartaoCredito();
      if (cartao) {
        setHasCartaoCadastrado(true);
        setValue("name", cartao.nomeImpresso);
        setValue("cvv", cartao.codigoSeguranca);
        setValue("flag", cartao.bandeiraId);
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
      showSuccess({
        content: "Cartão cadastrado com sucesso!",
        redirect: usuarioPaths.minhaConta,
      });

      setHasCartaoCadastrado(true);
    } catch (error) {
      if (error instanceof Error) {
        showError({ content: error.message });
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
      showSuccess({
        content: "Cartão atualizado com sucesso!",
        redirect: usuarioPaths.minhaConta,
      });
    } catch (error) {
      if (error instanceof Error) {
        showError({ content: error.message });
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
          mask="000"
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
    </div>
  );
};
