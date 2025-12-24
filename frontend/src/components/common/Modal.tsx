interface ModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}
import { IoIosClose } from "react-icons/io";
import Button from "@/components/common/Button";

const Modal = ({ show, onClose, title, children }: ModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-black">
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative text-center z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        {title && <h2 className="mb-4 text-xl font-semibold">{title}</h2>}

        <div>{children}</div>

        <div className="mt-6 flex justify-end">
          <Button variant="secondary" onClick={onClose} className="w-full">
            <div className="flex items-center justify-center">
              <IoIosClose size={30} />
              <span>Fechar</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
