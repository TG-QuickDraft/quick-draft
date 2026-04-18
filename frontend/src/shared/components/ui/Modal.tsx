interface ModalProps {
  show: boolean;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: ModalVariants;

  onClose: () => void;
  onConfirm?: () => void;
}
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GoIssueClosed } from "react-icons/go";

import Button from "@/shared/components/ui/buttons/Button";
import type { ModalVariants } from "@/shared/types/ModalVariants";
import ModalContainer from "../ModalContainer";

const Modal = ({
  show,
  title,
  children,
  icon,
  variant,

  onClose,
  onConfirm,
}: ModalProps) => {
  if (!show) return null;

  return (
    <ModalContainer>
      <div className="relative text-center z-10 w-full rounded-lg bg-white">
        {title && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            {icon}
          </div>
        )}

        <div>{children}</div>

        <div className="mt-6 flex gap-5 items-center">
          <Button
            reversed={onConfirm !== undefined}
            variant={variant}
            onClick={onClose}
            className="w-full"
          >
            <div className="flex items-center justify-center gap-1">
              <IoIosCloseCircleOutline size={20} />
              <span>Fechar</span>
            </div>
          </Button>

          {onConfirm && (
            <Button variant={variant} onClick={onConfirm} className="w-full">
              <div className="flex items-center justify-center gap-1">
                <GoIssueClosed size={20} />
                <span>Confirmar</span>
              </div>
            </Button>
          )}
        </div>
      </div>
    </ModalContainer>
  );
};

export default Modal;
