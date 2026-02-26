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
import {
  TIPOS_USUARIO,
  type TipoUsuario,
} from "@/features/users/enums/tiposUsuario";
import type { UploadImagemDTO } from "@/shared/dtos/UploadImagemDTO";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { LoginDTO } from "@/features/auth/dtos/LoginDTO";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const CadastrarUsuario = () => {
  const [foto, setFoto] = useState<File | null>(null);
  const { login } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalStatus, setModalStatus] = useState<"Sucesso" | "Erro" | "">("");

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<IRegisterUserForm>({
    mode: "onChange",
    resolver: yupResolver(RegisterUserSchema),
  });
  const tipoSelecionado = watch("tipoUsuario");

  const enviar = async () => {
    const { nome, cpf, email, senha, confirmarSenha, tipoUsuario } =
      getValues();
    const usuario = {
      nome,
      cpf,
      email,
      senha,
      confirmarSenha,
      tipoUsuario,
    } as CriarUsuarioDTO;

    try {
      await adicionarUsuario(usuario);

      const loginRequest: LoginDTO = {
        email: email,
        senha: senha,
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

        <Input
          name="foto"
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFoto(e.target.files[0]);
            }
          }}
        />

        <div>
          <h2>Tipo de Usuário</h2>

          {TIPOS_USUARIO.map((tipo, index) => (
            <label key={index} className="mx-4">
              {`${tipo} `}

              <Input
                key={tipo}
                type="radio"
                value={tipo}
                {...register("tipoUsuario")}
                checked={tipoSelecionado === tipo}
              />
            </label>
          ))}
        </div>

        <Button icon={<LuSave size={30} />}>Salvar</Button>
      </form>

      {foto && (
        <div className="pt-6">
          <img
            src={foto ? URL.createObjectURL(foto) : ""}
            alt="Preview"
            style={{ width: 200, height: "auto", marginTop: 10 }}
          />
        </div>
      )}

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
