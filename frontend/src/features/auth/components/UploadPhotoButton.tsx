import { useRef } from "react";
import { FaCamera } from "react-icons/fa";

interface UploadFotoButtonProps {
  onSelect: (file: File, preview: string) => void;
}

const UploadFotoButton = ({ onSelect }: UploadFotoButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selecionarFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Apenas imagens são permitidas.");
      return;
    }

    const preview = URL.createObjectURL(file);

    onSelect(file, preview);
  };

  return (
    <>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-1 right-1
                  bg-black text-white 
                  p-3 rounded-full 
                  border-3 border-white
                  shadow-md
                  hover:scale-105 transition"
      >
        <FaCamera size={14} />
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={selecionarFoto}
        accept="image/png, image/jpeg, image/jpg, image/gif"
        className="hidden"
      />
    </>
  );
};

export default UploadFotoButton;
