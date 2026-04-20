import { BackButton } from "@/shared/components/ui/buttons/BackButton";
import clsx from "clsx";
import Button from "@/shared/components/ui/buttons/Button";
import Title from "@/shared/components/ui/titles/Title";

import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import { FaMoneyCheck } from "react-icons/fa";
import PaymentSection from "../components/PaymentSection";
import PaymentWrapper from "../components/PaymentWrapper";
import CreditCard from "../components/CreditCard";
import { useModal } from "@/shared/contexts/modal.context";
import { usuarioPaths } from "@/features/users/routes/usuarioPaths";
import { useEffect, useState } from "react";
import { consultarServicoPorId } from "@/features/services/api/servico.api";
import type { ServicoDTO } from "@/features/services/dtos/ServicoDTO";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "@/shared/components/ui/Spinner";

import { LOADING_TIMEOUT } from "@/shared/utils/loadingTimeout";
import { numberToCurrency } from "@/shared/utils/number.utils";
import { format } from "date-fns";
import type { ClienteDTO } from "@/features/clients/dtos/ClienteDTO";
import { consultarClientePorId } from "@/features/clients/api/cliente.api";
import { consultarCartaoCredito } from "../api/cartaoCredito.api";
import type { CartaoCreditoDTO } from "../dtos/cartaoCredito/CartaoCreditoDTO";
import { capitalizeEachWord } from "@/shared/utils/string.utils";
import { AddButton } from "@/shared/components/ui/buttons/AddButton";
import { clientePaths } from "@/features/clients/routes/clientePaths";
import { financePaths } from "../routes/financePaths";
import { useModalFactory } from "@/shared/hooks/useModalFactory";

import RatingModal from "@/shared/components/ui/modals/RatingModal";

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

  const handlePayment = () => {
    showSuccess({
      content: "Pagamento realizado com sucesso!",
      onClose: openRatingModal,
    });
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
                        `${id ? `?from=${financePaths.realizarPagamentoById(id)}` : ""}`,
                    )
                  }
                />
              </div>
            )}
            <Button
              disabled={!cartao}
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
        redirect={usuarioPaths.minhaConta}
      />
    </>
  );
};

export default RealizarPagamento;
