import Button from "@/shared/components/ui/buttons/Button";
import { LuSave } from "react-icons/lu";

import type { SalvarProjetoFreelancerDTO } from "@/features/freelancers/dtos/projetoFreelancer/SalvarProjetoFreelancerDTO";
import {
  adicionarProjetoFreelancer,
  enviarImagemProjeto,
} from "@/features/freelancers/api/projetoFreelancer.api";
import Input from "@/shared/components/ui/Inputs/Input";
import {
  NewProjectSchema,
  type INewProjectForm,
} from "../validations/freelancers.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import ImagePicker from "@/features/users/components/ImagePicker";
import { useModal } from "@/shared/contexts/modal.context";
import { usuarioPaths } from "@/features/users/routes/usuarioPaths";
import { useEffect, useState } from "react";
import { consultarProjetoPorId } from "@/features/freelancers/api/projetoFreelancer.api";
import { LOADING_TIMEOUT } from "@/shared/utils/loadingTimeout";
import Spinner from "@/shared/components/ui/Spinner";

import { BackButton } from "@/shared/components/ui/buttons/BackButton";
import { atualizarProjetoFreelancer } from "@/features/freelancers/api/projetoFreelancer.api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { freelancerPaths } from "../routes/freelancerPaths";

export const CadastrarProjetoFreelancer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [initialImage, setInitialImage] = useState<string | undefined>(
    undefined,
  );
  const { showSuccess, showError } = useModal();
  const { usuario } = useAuth();

  const [params] = useSearchParams();
  const from = params.get("from");
  const projectId = params.get("id");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<INewProjectForm>({
    mode: "onChange",
    resolver: yupResolver(NewProjectSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      let timer = setTimeout(() => setIsLoading(true), LOADING_TIMEOUT);
      try {
        const project = await consultarProjetoPorId(Number(projectId));
        reset({
          name: project.nome,
          description: project.descricao,
          link: project.link,
        });
        setInitialImage(project.imagemUrl);
      } catch (error) {
        console.error(error);
      } finally {
        clearTimeout(timer);
        setIsLoading(false);
      }
    };
    if (projectId) fetchData();
  }, [projectId]);

  const enviar = async (data: INewProjectForm) => {
    const projeto: SalvarProjetoFreelancerDTO = {
      nome: data.name,
      descricao: data.description,
      link: data.link,
    };

    try {
      if (projectId) {
        await atualizarProjetoFreelancer(projeto, Number(projectId));

        const imagem = data.imagem?.imagem?.[0];

        if (imagem) {
          const form = new FormData();
          form.append("imagem", imagem);
          await enviarImagemProjeto(form, Number(projectId));
        }

        showSuccess({
          content: "Projeto atualizado com sucesso!",
          redirect: freelancerPaths.perfilFreelancerById(usuario?.id || ""),
        });
        return;
      }

      const projetoAdicionado = await adicionarProjetoFreelancer(projeto);

      const imagem = data.imagem?.imagem?.[0];

      if (imagem && projetoAdicionado) {
        const form = new FormData();

        form.append("imagem", imagem);

        await enviarImagemProjeto(form, projetoAdicionado.id);
      }

      showSuccess({
        content: "Projeto cadastrado com sucesso!",
        redirect: from ? from : usuarioPaths.minhaConta,
      });
    } catch (error) {
      if (error instanceof Error) {
        showError({ content: error.message });
      }
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full">
      <BackButton>
        {projectId ? "Editar Projeto" : "Cadastrar Projeto"}
      </BackButton>

      <form
        onSubmit={handleSubmit(enviar)}
        className="flex flex-col w-1/2 gap-5 my-8 p-16 rounded-xl shadow-2xl border border-gray-600/20"
      >
        <Input
          placeholder="Nome"
          showErrorMsg
          error={errors?.name?.message}
          {...register("name")}
        />

        <Input
          placeholder="Descrição"
          showErrorMsg
          error={errors?.description?.message}
          {...register("description")}
        />

        <Input
          placeholder="Link"
          showErrorMsg
          error={errors?.link?.message}
          {...register("link")}
        />

        <ImagePicker
          initialImage={initialImage}
          onChange={(file) => {
            if (!file) {
              setValue("imagem.imagem", undefined);
              return;
            }

            const dt = new DataTransfer();
            dt.items.add(file);

            setValue("imagem.imagem", dt.files);
          }}
          error={errors?.imagem?.imagem?.message}
        />

        <Button icon={<LuSave size={30} />}>
          {projectId ? "Salvar" : "Cadastrar"}
        </Button>
      </form>
    </div>
  );
};
