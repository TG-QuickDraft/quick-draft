import { useState } from "react";
import { adicionarUsuario, enviarFoto } from "@/features/users/api/usuario.api";

import Button from "@/shared/components/ui/Button";
import { LuSave } from "react-icons/lu";

import Title from "@/shared/components/ui/Title";

import {
  RegisterUserSchema,
  type IRegisterUserForm,
} from "@/features/users/validations/usuario.schema";
import Modal from "@/shared/components/ui/Modal";
import Input from "@/shared/components/ui/Inputs/Input";
import type { CriarUsuarioDTO } from "@/features/users/dtos/CriarUsuarioDTO";
import { TIPOS_USUARIO } from "@/features/users/enums/tiposUsuario";
import type { UploadImagemDTO } from "@/shared/dtos/UploadImagemDTO";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { LoginDTO } from "@/features/auth/dtos/LoginDTO";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Radio from "@/shared/components/ui/Inputs/Radio";

export const CadastrarUsuario = () => {
  const [foto, setFoto] = useState<File | null>(null);
  const { login } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalStatus, setModalStatus] = useState<"Sucesso" | "Erro" | "">("");

  const {
    register,
    handleSubmit,
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

      if (foto) {
        const upload: UploadImagemDTO = {
          imagem: foto,
        };

        await enviarFoto(upload);
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

        <label className="flex flex-col items-center justify-center border border-gray-300 rounded-lg h-32 cursor-pointer hover:bg-gray-50 transition">

          <input
            type="file"
            name="foto"
            accept="image/png, image/jpeg, image/jpg, image/gif"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFoto(e.target.files[0]);
              }
            }}
          />

          {!foto && (
            <div className="flex flex-col items-center text-gray-500 gap-2">
              <span className="text-sm">Escolher foto de perfil</span>
            </div>
          )}

          {foto && (
            <div className="flex flex-col items-center gap-2">
              <img
                src={URL.createObjectURL(foto)}
                className="w-20 h-20 rounded-full object-cover"
              />
              <span className="text-xs text-gray-500">
                Clique para alterar
              </span>
            </div>
          )}
        </label>

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
