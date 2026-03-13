import type { Usuario } from "@/features/users/dtos/Usuario";
import { useEffect, useState } from "react";
import { consultarUsuario } from "@/features/users/api/usuario.api";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { FaCamera } from "react-icons/fa";
import ConfirmarUploadFotoModal from "@/features/auth/components/ConfirmarUploadFotoModal";

export const MinhaConta = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagemSelecionada, setImagemSelecionada] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  useEffect(() => {
    const obterDadosUsuario = async () => {
      const dadosUsuario: Usuario = await consultarUsuario();
      setUsuario(dadosUsuario);
    };

    obterDadosUsuario();
  }, []);

  const selecionarFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Apenas imagens são permitidas.");
      return;
    }

    setImagemSelecionada(file);
    setPreview(URL.createObjectURL(file));
    setModalAberto(true);
  };

  return (
    <div className="px-12 py-10">
      {usuario && (
        <>
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-6">
              <div className="relative w-50 h-50">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <ProfilePhoto photoPath={usuario.fotoPerfilUrl} />
                </div>

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
              </div>

              <div>
                <h1 className="text-3xl font-semibold">
                  {usuario.nome}
                </h1>
                <h2>
                  {usuario.email}
                </h2>
                <h2>
                  {usuario.cpf}
                </h2>
              </div>
            </div>

            <div className="flex gap-12">
              <div className="bg-zinc-800 text-white px-10 py-6 rounded-2xl min-w-[180px]">
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm opacity-80">
                  Projetos Criados
                </p>
              </div>

              <div className="bg-secondary-100 text-black px-10 py-6 rounded-2xl min-w-[180px]">
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm">
                  Concluídos
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-5">
            <button
              onClick={() => navigate("/atualizar-dados")}
              className="px-4 py-1 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-black transition"
            >
              Atualizar Dados
            </button>

            <button
              onClick={() => navigate("/atualizar-senha")}
              className="px-4 py-1 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-black transition"
            >
              Alterar Senha
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-6">
              Meus Serviços
            </h2>

            <div className="flex gap-6 border-b border-gray-300 mb-16">
              <button className="pb-2 border-b-2 border-black font-medium">
                Em Andamento
              </button>

              <button className="pb-2 text-gray-500">
                Sem Atribuição
              </button>

              <button className="pb-2 text-gray-500">
                Todos
              </button>
            </div>

            <div className="flex flex-col items-center justify-center mt-24">
              <h3 className="text-2xl font-semibold mb-2">
                Nenhum Serviço Criado
              </h3>

              <p className="text-sm text-gray-500 mb-6">
                Criar novo serviço
              </p>

              <button 
                onClick={() => navigate("/cadastrarServico")}
                className="w-14 h-14 flex items-center justify-center border border-gray-400 rounded-full hover:bg-gray-100 transition cursor-pointer"
              >
                <GoPlus size={28} />
              </button>
            </div>
          </div>
        </>
      )}

      <ConfirmarUploadFotoModal
        imagem={imagemSelecionada}
        preview={preview}
        aberto={modalAberto}
        onClose={() => setModalAberto(false)}
        onSuccess={async () => {
          const dadosUsuario: Usuario = await consultarUsuario();
          setUsuario(dadosUsuario);
        }}
      />
    </div>
  );
};