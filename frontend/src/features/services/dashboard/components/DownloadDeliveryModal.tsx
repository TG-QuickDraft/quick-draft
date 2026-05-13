import ModalContainer from "@/shared/components/ui/modals/ModalContainer";
import clsx from "clsx";
import { GoDownload } from "react-icons/go";

interface DeliveryDetailsModalProps {
  isOpen: boolean;
  close: () => void;
  deliveryPath: string;
}

const DownloadDeliveryModal = ({
  isOpen,
  close,
  deliveryPath,
}: DeliveryDetailsModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalContainer close={close}>
      <div className="flex flex-col items-center justify-center gap-4 p-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-black">
          <GoDownload size={25} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Arquivo de Entrega
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            O serviço foi finalizado e o arquivo já está disponível para você.
          </p>
        </div>

        <a
          href={deliveryPath}
          download
          onClick={close}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "mt-2 flex w-full max-w-xs items-center justify-center gap-2 ",
            "rounded-xl bg-black px-6 py-3 text-white shadow-lg transition-all ",
            "hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
          )}
        >
          Baixar agora
        </a>
      </div>
    </ModalContainer>
  );
};

export default DownloadDeliveryModal;
