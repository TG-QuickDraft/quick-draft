import { enviarFoto } from "@/features/users/api/usuario.api";

type Props = {
  imagem: File | null;
  preview: string | null;
  aberto: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ConfirmarUploadFotoModal({
  imagem,
  preview,
  aberto,
  onClose,
  onSuccess,
}: Props) {
  if (!aberto || !imagem) return null;

  const confirmar = async () => {
    try {
      await enviarFoto({ imagem });
      onSuccess();
      onClose();
    } catch {
      alert("Erro ao enviar foto.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-xl w-[380px] text-center">
        <h2 className="text-lg font-semibold mb-4">
          Confirmar alteração
        </h2>

        {preview && (
          <img
            src={preview}
            className="w-40 h-40 rounded-full object-cover mx-auto mb-4"
          />
        )}

        <p className="mb-6">
          Tem certeza que deseja alterar sua foto de perfil?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancelar
          </button>

          <button
            onClick={confirmar}
            className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}