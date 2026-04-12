import Button from "@/shared/components/ui/buttons/Button";

import Title from "@/shared/components/ui/titles/Title";
import Input from "@/shared/components/ui/Inputs/Input";

import { CiLogin } from "react-icons/ci";
import InputGroup from "@/shared/components/ui/Inputs/InputGroup";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks/useAuth";
import type { LoginDTO } from "@/features/auth/dtos/LoginDTO";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema, type ILoginForm } from "../validations/login.schema";
import { useModal } from "@/shared/contexts/modal.context";
import { homePaths } from "@/features/home/routes/homePaths";

export const LoginUsuario = () => {
  const navigate = useNavigate();

  const { showError } = useModal();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    mode: "onChange",
    resolver: yupResolver(LoginSchema),
  });

  const enviar = async (data: ILoginForm) => {
    try {
      const loginRequest: LoginDTO = { email: data.email, senha: data.senha };
      await login(loginRequest);

      navigate(homePaths.home);
    } catch (error) {
      if (error instanceof Error) {
        showError({ content: error.message });
      }
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center h-full">
        <form
          onSubmit={handleSubmit(enviar)}
          className="flex flex-col max-w-md w-full my-8 p-12 rounded-xl shadow-2xl border border-gray-600/20"
        >
          <Title className="mb-6">Login Usuário</Title>
          <InputGroup>
            <h2>E-mail</h2>
            <Input
              type="email"
              showErrorMsg
              error={errors.email?.message}
              placeholder="Digite o seu e-mail"
              {...register("email")}
            />
          </InputGroup>
          <InputGroup>
            <h2>Senha</h2>
            <Input
              password
              showErrorMsg
              error={errors.senha?.message}
              placeholder="Digite a sua senha"
              {...register("senha")}
            />
          </InputGroup>
          <Button type="submit" icon={<CiLogin size={30} />}>
            Entrar
          </Button>
        </form>
      </div>
    </>
  );
};

export default LoginUsuario;
