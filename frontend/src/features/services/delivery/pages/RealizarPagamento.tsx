import { consultarCartaoCredito } from "@/features/clients/api/cartaoCredito.api";
import { consultarClientePorId } from "@/features/clients/api/cliente.api";
import type { CartaoCreditoDTO } from "@/features/clients/dtos/cartaoCredito/CartaoCreditoDTO";
import type { ClienteDTO } from "@/features/clients/dtos/ClienteDTO";
import { clientePaths } from "@/features/clients/routes/clientePaths";
import { consultarServicoPorId } from "@/features/services/proposal/api/servico.api";
import { realizarPagamento } from "@/features/services/delivery/api/pagamento.api";
import CreditCard from "@/features/services/delivery/components/CreditCard";
import PaymentSection from "@/features/services/delivery/components/PaymentSection";
import PaymentWrapper from "@/features/services/delivery/components/PaymentWrapper";
import { deliveryPaths } from "@/features/services/delivery/routes/deliveryPaths";
import type { ServicoDTO } from "@/features/services/proposal/dtos/ServicoDTO";
import { usuarioPaths } from "@/features/users/routes/usuarioPaths";

import { AddButton } from "@/shared/components/ui/buttons/AddButton";
import { BackButton } from "@/shared/components/ui/buttons/BackButton";
import Button from "@/shared/components/ui/buttons/Button";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import Spinner from "@/shared/components/ui/Spinner";
import Title from "@/shared/components/ui/titles/Title";
import { useModal } from "@/shared/contexts/modal.context";
import { useModalFactory } from "@/shared/hooks/useModalFactory";
import { LOADING_TIMEOUT } from "@/shared/utils/loadingTimeout";
import { numberToCurrency } from "@/shared/utils/number.utils";
import { capitalizeEachWord } from "@/shared/utils/string.utils";

import clsx from "clsx";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FaMoneyCheck } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import RatingModal from "@/shared/components/ui/modals/RatingModal";
import { useCriarAvaliacao } from "../hooks/useCriarAvaliacao";

const RealizarPagamento = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { showSuccess, showError } = useModal();
  const { openModal: openRatingModal, Modal: RatingModalComponent } =
    useModalFactory(RatingModal);

  const [loading, setLoading] = useState(false);

  const [servico, setServico] = useState<ServicoDTO | null>(null);
  const [cliente, setCliente] = useState<ClienteDTO | null>(null);
  const [cartao, setCartao] = useState<CartaoCreditoDTO | null>(null);

  const mockTaxa = 0.05;

  const { enviarAvaliacao } = useCriarAvaliacao();

  useEffect(() => {
    (async () => {
      if (!id) return;

      let timer = setTimeout(() => setLoading(true), LOADING_TIMEOUT);
      try {
        const servico = await consultarServicoPorId(Number(id));
        const cartao = await consultarCartaoCredito();

        if (servico) {
          const cliente = await consultarClientePorId(servico.clienteId);
          setCliente(cliente);
        }

        setCartao(cartao);
        setServico(servico);
      } catch (error) {
        if (error instanceof Error) showError({ content: error.message });
      } finally {
        setLoading(false);
        clearTimeout(timer);
      }
    })();
  }, []);

  const handlePayment = async () => {
    if (!id) return;

    setLoading(true);

    try {
      await realizarPagamento({ servicoId: Number(id) });

      showSuccess({
        content: "Pagamento realizado com sucesso!",
        onClose: openRatingModal,
      });
    } catch (error) {
      if (typeof error === "string") {
        showError({ content: error });
      } else if (error instanceof Error) {
        showError({ content: error.message });
      } else {
        showError({ content: "Erro ao realizar pagamento" });
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmitAvaliacao = async (rating: number, comentario: string | undefined) => {
    await enviarAvaliacao(Number(id), rating, comentario);
  };

  if (loading) return <Spinner />;

  if (!servico || !cliente) return null;

  return (
    <>
      <div className="flex gap-6 flex-wrap p-4 max-w-300 mx-auto w-full">
        <PaymentSection>
          <BackButton>Serviço</BackButton>
          <PaymentWrapper className="min-h-80">
            <div
              className={clsx(
                "flex items-center justify-between border-b border-neutral-20",
                "pb-4",
              )}
            >
              <div>
                <h2 className="text-xl font-semibold mb-3">{servico.nome}</h2>
                <span className="text-2xl">
                  {numberToCurrency(servico.valorMinimo)}
                </span>
              </div>
              <ProfilePhoto
                photoPath={cliente.fotoPerfilUrl}
                size="md"
                className="w-fit!"
              />
            </div>
            <div className="text-neutral-80">
              <p>Prazo: {format(servico.prazo, "dd/MM/yyyy")}</p>
              <p>Taxa: {mockTaxa * 100}%</p>
            </div>
          </PaymentWrapper>
          <PaymentWrapper>
            <h3 className="text-center text-xl font-semibold">
              <span>Total a ser pago: </span>
              {numberToCurrency(
                servico.valorMinimo + servico.valorMinimo * mockTaxa,
              )}
            </h3>
          </PaymentWrapper>
        </PaymentSection>
        <PaymentSection className="max-w-100">
          <Title>Cartão</Title>
          <PaymentWrapper>
            {cartao ? (
              <CreditCard>{capitalizeEachWord(cartao.nomeImpresso)}</CreditCard>
            ) : (
              <div className="flex flex-col items-center p-4">
                <p>Nenhum cartão cadastrado</p>
                <AddButton
                  className="mt-4"
                  onClick={() =>
                    navigate(
                      clientePaths.cadastrarCartaoCredito +
                        `${id ? `?from=${deliveryPaths.realizarPagamentoById(id)}` : ""}`,
                    )
                  }
                />
              </div>
            )}
            <Button
              disabled={!cartao || loading}
              icon={<FaMoneyCheck />}
              className="w-full"
              variant="secondary"
              onClick={handlePayment}
            >
              Realizar Pagamento
            </Button>
          </PaymentWrapper>
        </PaymentSection>
      </div>

      <RatingModalComponent
        title="Avaliar Freelancer"
        subtitle="Qual nota deseja dar ao freelancer?"
        onSubmit={onSubmitAvaliacao}
      />
    </>
  );
};

export default RealizarPagamento;
