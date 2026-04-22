import type { UsuarioDTO } from "@/features/users/dtos/UsuarioDTO";
import { useEffect, useState } from "react";
import { consultarUsuario } from "@/features/users/api/usuario.api";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import { useNavigate } from "react-router-dom";
import { AddButton } from "@/shared/components/ui/buttons/AddButton";
import { usuarioPaths } from "@/features/users/routes/usuarioPaths";
import ConfirmarUploadFotoModal from "@/features/users/components/ConfirmarUploadFotoModal";
import UploadFotoButton from "@/features/users/components/UploadPhotoButton";

import { MeusServicosList } from "@/features/users/components/MeusServicosList";
import { consultarMeusServicos } from "@/features/services/proposal/api/servico.api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { MinhasPropostasList } from "../components/MinhasPropostasList";
import { consultarMinhasPropostas } from "@/features/services/proposal/api/proposta.api";
import { proposalPaths } from "@/features/services/proposal/routes/proposalPaths";

import { SummaryCards } from "../components/SummaryCards";

export const MinhaConta = () => {
  const [usuario, setUsuario] = useState<UsuarioDTO | null>(null);
  const navigate = useNavigate();
  const [imagemSelecionada, setImagemSelecionada] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const { roles } = useAuth();
  const [temServicos, setTemServicos] = useState<boolean | null>(null);
  const [temPropostas, setTemPropostas] = useState<boolean | null>(null);

  const [proposalTotal, setProposalTotal] = useState(0);
  const [serviceTotal, setServiceTotal] = useState(0);

  useEffect(() => {
    const obterDadosUsuario = async () => {
      const dadosUsuario: UsuarioDTO = await consultarUsuario();
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
        setServiceTotal(response.itens.length);
      } catch {
        setTemServicos(false);
      }
    };

    const verificarPropostas = async () => {
      if (!roles.includes("Freelancer")) return;

      try {
        const response = await consultarMinhasPropostas();
        setTemPropostas(response.length > 0);
        setProposalTotal(response.length);
      } catch {
        setTemPropostas(false);
      }
    };

    verificarServicos();
    verificarPropostas();
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

            <SummaryCards
              proposalTotal={proposalTotal}
              serviceTotal={serviceTotal}
              roles={roles}
            />
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
            <h2 className="text-xl font-semibold mb-6">
              {roles.includes("Cliente") ? "Meus Serviços" : ""}
              {roles.includes("Freelancer") ? "Minhas Propostas" : ""}
            </h2>

            {roles.includes("Cliente") && temServicos !== null && (
              <>
                <div className="flex gap-6 border-b border-gray-300 mb-6">
                  <button className="pb-2 border-b-2 border-black font-medium">
                    Em Andamento
                  </button>

                  <button className="pb-2 text-gray-500">Sem Atribuição</button>

                  <button className="pb-2 text-gray-500">Todos</button>
                </div>
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
                      onClick={() => navigate(proposalPaths.cadastrarServico)}
                    />
                  </div>
                )}
              </>
            )}

            {roles.includes("Freelancer") && temPropostas !== null && (
              <>
                {temPropostas ? (
                  <MinhasPropostasList />
                ) : (
                  <div className="flex flex-col items-center justify-center mt-24">
                    <h3 className="text-2xl font-semibold mb-2">
                      Nenhuma Proposta Realizada
                    </h3>
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
          const dadosUsuario: UsuarioDTO = await consultarUsuario();
          setUsuario(dadosUsuario);
        }}
      />
    </div>
  );
};
