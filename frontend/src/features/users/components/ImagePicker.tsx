import { useState } from "react";

interface ImagePickerProps {
  onChange?: (file: File | null) => void;
  initialImage?: string;
  error?: string;
}

export default function ImagePicker({
  onChange,
  initialImage,
  error,
}: ImagePickerProps) {
  const [file, setFile] = useState<File | null>(null);

  const preview = file ? URL.createObjectURL(file) : initialImage;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;

    setFile(selected);

    if (onChange) {
      onChange(selected);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="flex flex-col items-center justify-center border border-gray-300 rounded-lg h-32 cursor-pointer hover:bg-gray-50 transition overflow-hidden">

        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          className="hidden"
          onChange={handleChange}
        />

        {!preview && (
          <div className="flex flex-col items-center text-gray-500 gap-2">
            <span className="text-sm">Escolher foto de perfil</span>
          </div>
        )}

        {preview && (
          <div className="flex flex-col items-center gap-2">
            <img
              src={preview}
              className="w-20 h-20 rounded-full object-cover"
            />

            <span className="text-xs text-gray-500">
              Clique para alterar
            </span>
          </div>
        )}
      </label>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}