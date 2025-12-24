import Button from "@/components/common/Button";

import Title from "@/components/common/Title";
import Input from "@/components/common/Inputs/Input";

import { CiLogin } from "react-icons/ci";
import InputGroup from "@/components/common/Inputs/InputGroup";
import { useForm } from "react-hook-form";
import { LoginSchema, type ILoginForm } from "@/validations/login.schema";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { localStorageKeys } from "@/utils/localStorageKeys";
import { useAuth } from "@/hooks/useAuth";
import type { UserLogin } from "@/domain/models/Login";

export const LoginUsuario = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

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
      const { email } = getValues();
      const user = { email, username: "Eu" } as UserLogin;

      setUser(user);
      localStorage.setItem(localStorageKeys.user, JSON.stringify(user));
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
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
