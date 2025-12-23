import Button from "@/components/Button";

import Title from "@/components/Title";
import Input from "@/components/Inputs/Input";

import { CiLogin } from "react-icons/ci";
import InputGroup from "@/components/Inputs/InputGroup";
import { useForm } from "react-hook-form";
import { LoginSchema, type ILoginForm } from "@/validations/LoginSchema";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

export const LoginUsuario = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(LoginSchema),
  });

  const enviar = async () => {
    const { email, senha } = getValues();
    const login = {
      email: email,
      senha: senha,
    };
    console.log("Olhe: ", login);
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Title>Login Usuário</Title>

      <form
        onSubmit={handleSubmit(enviar)}
        className="flex flex-col max-w-md w-full my-8 p-12 rounded-xl shadow-2xl border border-gray-600/20"
      >
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

        <Button type="submit" className="mt-2" icon={<CiLogin size={30} />}>
          Entrar
        </Button>
      </form>
    </div>
  );
};

export default LoginUsuario;
