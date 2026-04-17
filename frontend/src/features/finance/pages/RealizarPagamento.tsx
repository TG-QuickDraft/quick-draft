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

const RealizarPagamento = () => {
  const { showSuccess } = useModal();

  const handlePayment = () => {
    showSuccess({
      content: "Pagamento realizado com sucesso!",
      redirect: usuarioPaths.minhaConta,
    });
  };

  return (
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
              <h2 className="text-xl font-semibold mb-3">
                Logo para loja de material de Construção
              </h2>
              <span className="text-2xl">R$ 10,00</span>
            </div>
            <ProfilePhoto size="md" className="w-fit!" />
          </div>

          <div className="text-neutral-80">
            <p>Prazo: 30 dias</p>
            <p>Taxa: 10%</p>
          </div>
        </PaymentWrapper>
        <PaymentWrapper>
          <h3 className="text-center text-xl font-semibold">
            Total a ser pago: R$ 11,00
          </h3>
        </PaymentWrapper>
      </PaymentSection>

      <PaymentSection className="max-w-100">
        <Title>Cartão</Title>

        <PaymentWrapper>
          <CreditCard>Carttão</CreditCard>
          <Button
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
  );
};

export default RealizarPagamento;
