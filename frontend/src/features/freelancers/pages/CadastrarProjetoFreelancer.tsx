import Button from "@/shared/components/ui/buttons/Button";
import { LuSave } from "react-icons/lu";

import Title from "@/shared/components/ui/titles/Title";

import type { CriarProjetoFreelancerDTO } from "@/features/freelancers/dtos/projetoFreelancer/CriarProjetoFreelancerDTO";
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

export const CadastrarProjetoFreelancer = () => {
  const { showSuccess, showError } = useModal();

  const [params] = useSearchParams();
  const from = params.get("from");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<INewProjectForm>({
    mode: "onChange",
    resolver: yupResolver(NewProjectSchema),
  });

  const enviar = async (data: INewProjectForm) => {
    const projeto: CriarProjetoFreelancerDTO = {
      nome: data.name,
      descricao: data.description,
      link: data.link,
    };

    try {
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

  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full">
      <Title>Cadastrar Projeto</Title>

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

        <Button icon={<LuSave size={30} />}>Salvar</Button>
      </form>
    </div>
  );
};
