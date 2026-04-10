import { useState } from "react";
import { adicionarUsuario, enviarFoto } from "@/features/users/api/usuario.api";

import Button from "@/shared/components/ui/buttons/Button";
import { LuSave } from "react-icons/lu";

import Title from "@/shared/components/ui/titles/Title";

import {
  RegisterUserSchema,
  type IRegisterUserForm,
} from "@/features/users/validations/usuario.schema";
import Modal from "@/shared/components/ui/Modal";
import Input from "@/shared/components/ui/Inputs/Input";
import type { CriarUsuarioDTO } from "@/features/users/dtos/CriarUsuarioDTO";
import { TIPOS_USUARIO } from "@/features/users/enums/tiposUsuario";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { LoginDTO } from "@/features/auth/dtos/LoginDTO";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Radio from "@/shared/components/ui/Inputs/Radio";
import ImagePicker from "@/features/users/components/ImagePicker";

export const CadastrarUsuario = () => {
  const { login } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalStatus, setModalStatus] = useState<"Sucesso" | "Erro" | "">("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IRegisterUserForm>({
    mode: "onChange",
    resolver: yupResolver(RegisterUserSchema),
    defaultValues: {
      tipoUsuario: TIPOS_USUARIO[0],
    },
  });

  const tipoSelecionado = watch("tipoUsuario");

  const enviar = async (data: IRegisterUserForm) => {
    const usuario = {
      nome: data.nome,
      cpf: data.cpf,
      email: data.email,
      senha: data.senha,
      confirmarSenha: data.confirmarSenha,
      tipoUsuario: data.tipoUsuario,
    } as CriarUsuarioDTO;

    try {
      await adicionarUsuario(usuario);

      const loginRequest: LoginDTO = {
        email: data.email,
        senha: data.senha,
      };

      await login(loginRequest);

      const imagemProjeto = data.fotoPerfil.imagem?.[0];

      if (imagemProjeto) {
        await enviarFoto({ imagem: imagemProjeto });
      }

      setModalStatus("Sucesso");
      setModalMsg("Usuário cadastrado com sucesso!");
      setShowModal(true);
    } catch (error) {
      if (error instanceof Error) {
        setModalStatus("Erro");
        setModalMsg(error.message);
        setShowModal(true);
      }

      return;
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full">
      <Title>Cadastrar Usuário</Title>

      <form
        onSubmit={handleSubmit(enviar)}
        className="flex flex-col w-1/2 gap-5 my-8 p-16 rounded-xl shadow-2xl border border-gray-600/20"
      >
        <Input
          placeholder="Seu nome"
          showErrorMsg
          error={errors?.nome?.message}
          {...register("nome")}
        />

        <Input
          placeholder="Seu CPF"
          showErrorMsg
          error={errors?.cpf?.message}
          {...register("cpf")}
          mask="000.000.000-00"
        />

        <Input
          placeholder="Seu e-mail"
          showErrorMsg
          error={errors?.email?.message}
          {...register("email")}
        />

        <Input
          password
          placeholder="Sua senha"
          type="password"
          showErrorMsg
          error={errors?.senha?.message}
          {...register("senha")}
        />

        <Input
          placeholder="Confirme sua senha"
          password
          showErrorMsg
          error={errors?.confirmarSenha?.message}
          {...register("confirmarSenha")}
        />

        <ImagePicker
          onChange={(file) => {
            if (!file) {
              setValue("fotoPerfil.imagem", undefined);
              return;
            }

            const dt = new DataTransfer();
            dt.items.add(file);

            setValue("fotoPerfil.imagem", dt.files);
          }}
          error={errors?.fotoPerfil?.imagem?.message}
          mensagem="Escolher foto de perfil"
        />

        <div>
          <h2 className="mb-5 text-[16px]">Tipo de Usuário</h2>

          <div className="flex gap-2 justify-evenly mb-4 border-y border-gray-600/20 py-5">
            {TIPOS_USUARIO.map((tipo, index) => (
              <Radio
                key={index}
                value={tipo}
                label={tipo}
                checked={tipoSelecionado === tipo}
                {...register("tipoUsuario")}
              />
            ))}
          </div>
        </div>

        <Button icon={<LuSave size={30} />}>Salvar</Button>
      </form>

      <Modal
        show={showModal}
        title={modalStatus}
        onClose={() => setShowModal(false)}
      >
        {modalMsg}
      </Modal>
    </div>
  );
};
