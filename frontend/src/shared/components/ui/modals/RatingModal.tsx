import ModalContainer from "@/shared/components/ui/modals/ModalContainer";
import Button from "@/shared/components/ui/buttons/Button";
import StarRating from "@/shared/components/ui/StarRating";
import { useModal } from "@/shared/contexts/modal.context";
import clsx from "clsx";
import { useState } from "react";
import Title from "@/shared/components/ui/titles/Title";

import { BigStarEmpty, BigStarFull } from "@/shared/assets";

const RatingModal = ({
  title = "Title",
  subtitle = "Subtitle",
  redirect,
  isOpen,
  close,
}: {
  title?: string;
  subtitle?: string;
  redirect?: string;
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
    showSuccess({ content: "Avaliação enviada com sucesso!", redirect });
    reset();
    close();
  };

  const hasBeenRated = rating > 0;

  return (
    <ModalContainer>
      <Title className="font-semibold!">{title}</Title>

      <div className="flex flex-col items-center gap-6 w-full mt-6">
        <p className="text-neutral-80 font-semibold">{subtitle}</p>
        <div>
          <StarRating
            rating={rating}
            onChange={(value) => setRating(value)}
            emptySymbol={<BigStarEmpty className="mx-4 h-8 " />}
            fullSymbol={<BigStarFull className="mx-4 h-8 text-secondary-100" />}
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

      <div className="max-w-md mx-auto flex gap-4">
        <Button
          width="full"
          reversed
          onClick={handleCancel}
          variant="secondary"
        >
          Cancelar
        </Button>
        <Button
          disabled={!hasBeenRated}
          onClick={handleSubmit}
          variant="secondary"
          width="full"
        >
          Enviar
        </Button>
      </div>
    </ModalContainer>
  );
};

export default RatingModal;
