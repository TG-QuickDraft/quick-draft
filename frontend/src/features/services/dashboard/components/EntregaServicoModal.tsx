import { useState } from "react";

import Button from "@/shared/components/ui/buttons/Button";
import Modal from "@/shared/components/ui/modals/Modal";
import { useModal } from "@/shared/contexts/modal.context";
import { LOADING_TIMEOUT } from "@/shared/utils/loadingTimeout";
import { realizarEntregaServico } from "../../delivery/api/entrega.api";

type Props = {
  servicoId: number;
  show: boolean;
  onClose: () => void;
  openRatingModal?: () => void;
};

const EntregaServicoModal = ({ servicoId, show, onClose, openRatingModal }: Props) => {
  const [arquivo, setArquivo] = useState<File | null>(null);

  const { showSuccess, showDanger } = useModal();

  const handleConfirmar = () => {
    showDanger({
      content:
        "Tem certeza que deseja entregar este serviço? Essa ação não pode ser desfeita.",
      onConfirm: handleConfirmarEntrega,
    });
  };

  const handleConfirmarEntrega = () => {
    setTimeout(async () => {
      try {
        await realizarEntregaServico({ servicoId: servicoId, arquivo: arquivo || undefined});

        showSuccess({
          content: "Entregou! confia.",
          onClose: openRatingModal,
        });
      } catch (error) {
        if (error instanceof Error) {
          showDanger({ content: error.message });
        }
      } finally {
        setArquivo(null);
        onClose();
      }
      
    }, LOADING_TIMEOUT);
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
