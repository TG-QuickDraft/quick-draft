import type { Usuario } from "@/features/users/dtos/Usuario";
import { useEffect, useState } from "react";
import { consultarUsuario } from "@/features/users/api/usuario.api";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import { useNavigate } from "react-router-dom";
import { AddButton } from "@/shared/components/ui/buttons/AddButton";
import { usuarioPaths } from "@/features/users/routes/usuarioPaths";
import { servicoPaths } from "@/features/services/routes/servicoPaths";
import ConfirmarUploadFotoModal from "@/features/users/components/ConfirmarUploadFotoModal";
import UploadFotoButton from "@/features/users/components/UploadPhotoButton";

import { MeusServicosList } from "@/features/users/components/MeusServicosList";
import { consultarMeusServicos } from "@/features/services/api/servico.api";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const MinhaConta = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const navigate = useNavigate();
  const [imagemSelecionada, setImagemSelecionada] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const { roles } = useAuth();
  const [temServicos, setTemServicos] = useState<boolean | null>(null);
  useEffect(() => {
    const obterDadosUsuario = async () => {
      const dadosUsuario: Usuario = await consultarUsuario();
      setUsuario(dadosUsuario);
    };

    obterDadosUsuario();
  }, []);

  useEffect(() => {
    const verificarServicos = async () => {
      if (!roles.includes("Cliente")) return;

      try {
        const response = await consultarMeusServicos(1, 1);
        setTemServicos(response.itens.length > 0);
      } catch {
        setTemServicos(false);
      }
    };

    verificarServicos();
  }, [roles]);

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

                <UploadFotoButton
                  onSelect={(file, preview) => {
                    setImagemSelecionada(file);
                    setPreview(preview);
                    setModalAberto(true);
                  }}
                />
              </div>

              <div>
                <h1 className="text-3xl font-semibold">{usuario.nome}</h1>
                <h2>{usuario.email}</h2>
                <h2>{usuario.cpf}</h2>
              </div>
            </div>

            <div className="flex gap-12">
              <div className="bg-zinc-800 text-white px-10 py-6 rounded-2xl min-w-45">
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm opacity-80">Projetos Criados</p>
              </div>

              <div className="bg-secondary-100 text-black px-10 py-6 rounded-2xl min-w-45">
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm">Concluídos</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-5">
            <button
              onClick={() => navigate(usuarioPaths.atualizarDados)}
              className="px-4 py-1 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-black transition"
            >
              Atualizar Dados
            </button>

            <button
              onClick={() => navigate(usuarioPaths.atualizarSenha)}
              className="px-4 py-1 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-black transition"
            >
              Alterar Senha
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-6">Meus Serviços</h2>

            <div className="flex gap-6 border-b border-gray-300 mb-16">
              <button className="pb-2 border-b-2 border-black font-medium">
                Em Andamento
              </button>

              <button className="pb-2 text-gray-500">Sem Atribuição</button>

              <button className="pb-2 text-gray-500">Todos</button>
            </div>

            {roles.includes("Cliente") && temServicos !== null && (
              <>
                {temServicos ? (
                  <MeusServicosList />
                ) : (
                  <div className="flex flex-col items-center justify-center mt-24">
                    <h3 className="text-2xl font-semibold mb-2">
                      Nenhum Serviço Criado
                    </h3>

                    <p className="text-sm text-gray-500 mb-6">
                      Criar novo serviço
                    </p>

                    <AddButton
                      onClick={() => navigate(servicoPaths.cadastrarServico)}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}

      <ConfirmarUploadFotoModal
        imagem={imagemSelecionada}
        message="Tem certeza que deseja alterar sua foto de perfil?"
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
