import Button from "@/components/common/ui/Button";

import Title from "@/components/common/ui/Title";
import Input from "@/components/common/ui/Inputs/Input";

import { CiLogin } from "react-icons/ci";
import InputGroup from "@/components/common/ui/Inputs/InputGroup";
import { useForm } from "react-hook-form";
import { LoginSchema, type ILoginForm } from "@/validations/login.schema";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import type { LoginDTO } from "@/dtos/login/LoginDTO";

export const LoginUsuario = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(LoginSchema),
    mode: "onChange",
  });

  const enviar = async () => {
    try {
      const { email, senha } = getValues();
      const loginRequest: LoginDTO = { email, senha };

      await login(loginRequest);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
            placeholder="Digite o seu e-mail"
            error={errors.email?.message}
            {...register("email")}
          />
        </InputGroup>

        <InputGroup>
          <h2>Senha</h2>
          <Input
            type="password"
            placeholder="Digite a sua senha"
            error={errors.senha?.message}
            {...register("senha")}
          />
        </InputGroup>

        <Button type="submit" icon={<CiLogin size={30} />}>
          Entrar
        </Button>
      </form>
    </div>
  );
};

export default LoginUsuario;
