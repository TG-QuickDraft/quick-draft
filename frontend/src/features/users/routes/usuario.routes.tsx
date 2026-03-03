import { CadastrarUsuario } from "@/features/users/pages/CadastrarUsuario";
import LoginUsuario from "@/features/auth/pages/LoginUsuario";
import { MinhaConta } from "@/features/auth/pages/MinhaConta";
import { AtualizarSenha } from "@/features/auth/pages/AtualizarSenha";

export const usuarioRoutes = [
  { path: "/login", element: <LoginUsuario /> },
  { path: "/cadastrarUsuario", element: <CadastrarUsuario /> },
  { path: "/minhaConta", element: <MinhaConta/>},
  { path: "/atualizarSenha", element: <AtualizarSenha/>}
];
