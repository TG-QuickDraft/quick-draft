import { useState } from "react";

import Modal from "@/shared/components/ui/modals/Modal";
import Button from "@/shared/components/ui/buttons/Button";
import { useModal } from "@/shared/contexts/modal.context";

type Props = {
  show: boolean;
  onClose: () => void;
  openRatingModal?: () => void;
};

const EntregaServicoModal = ({ show, onClose, openRatingModal }: Props) => {
  const [arquivo, setArquivo] = useState<File | null>(null);

  const { showSuccess } = useModal();

  const handleConfirmar = () => {
    setArquivo(null);
    onClose();

    showSuccess({
      content: "Entregou! confia.",
      onClose: openRatingModal,
    });
  };

  return (
    <Modal show={show} title="Entregar Serviço" onClose={onClose}>
      <div className="flex flex-col gap-5">
        <label
          className={`
                            w-full h-40 border-2 border-dashed rounded-xl
                            flex flex-col items-center justify-center
                            text-center cursor-pointer transition-all
                            ${
                              arquivo
                                ? "border-green-400 bg-green-50"
                                : "border-gray-300 hover:border-black"
                            }
                        `}
        >
          <input
            type="file"
            accept=".zip,.rar,.7z"
            className="hidden"
            onChange={(e) => setArquivo(e.target.files?.[0] || null)}
          />
          {!arquivo ? (
            <>
              <p className="text-sm text-gray-600">
                Clique aqui para anexar seu arquivo
              </p>
              <p className="text-xs text-gray-400 mt-1">(.zip, .rar, .7z)</p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-green-700">
                Arquivo selecionado
              </p>
              <p className="text-xs text-gray-600 mt-1">{arquivo.name}</p>
              <p className="text-xs text-gray-400 mt-1">Clique para trocar</p>
            </>
          )}
        </label>
        <Button
          disabled={!arquivo}
          onClick={handleConfirmar}
          className="w-full"
        >
          Confirmar Entrega
        </Button>
      </div>
    </Modal>
  );
};

export default EntregaServicoModal;
