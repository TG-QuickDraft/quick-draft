import ModalContainer from "@/shared/components/ui/modals/ModalContainer";
import Stack from "@/shared/components/Stack";
import Button from "@/shared/components/ui/buttons/Button";
import StarRating from "@/shared/components/ui/StarRating";
import { useModal } from "@/shared/contexts/modal.context";
import clsx from "clsx";
import { useState } from "react";
import Title from "@/shared/components/ui/titles/Title";

import { BigStarEmpty, BigStarFull } from "@/shared/assets";

const RatingModal = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const [rating, setRating] = useState(0);
  const { showSuccess } = useModal();

  if (!isOpen) return null;

  const reset = () => {
    setRating(0);
  };

  const handleCancel = () => {
    reset();
    close();
  };

  const handleSubmit = () => {
    showSuccess({ content: "Avaliação enviada com sucesso!" });
    reset();
    close();
  };

  const hasBeenRated = rating > 0;

  return (
    <ModalContainer size="md">
      <Title>Avaliar serviço</Title>

      <div className="flex flex-col items-center gap-4 w-full">
        <p className="text-neutral-80 font-semibold">
          O que você achou do serviço?
        </p>
        <div>
          <StarRating
            rating={rating}
            onChange={(value) => setRating(value)}
            emptySymbol={<BigStarEmpty className="mx-6 h-8" />}
            fullSymbol={<BigStarFull className="mx-6 h-8" />}
          />
          <div className="flex justify-between text-[12px] font-semibold text-neutral-60">
            <span>Muito ruim</span> <span>Muito bom</span>
          </div>
        </div>

        <div
          className={clsx(
            "flex flex-col gap-4 w-full overflow-hidden transition-[max-height,opacity]",
            "max-h-0 opacity-0 duration-500 ease-out",
            hasBeenRated && "max-h-96 opacity-100",
          )}
        ></div>
      </div>

      <Stack direction="row" gap={4} className="mt-5">
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button disabled={!hasBeenRated} onClick={handleSubmit}>
          Enviar
        </Button>
      </Stack>
    </ModalContainer>
  );
};

export default RatingModal;
