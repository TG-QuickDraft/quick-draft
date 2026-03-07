import { CadastrarUsuario } from "@/features/users/pages/CadastrarUsuario";
import LoginUsuario from "@/features/auth/pages/LoginUsuario";
import { MinhaConta } from "@/features/auth/pages/MinhaConta";
import { AtualizarSenha } from "@/features/auth/pages/AtualizarSenha";
import { AtualizarDadosUsuario } from "@/features/auth/pages/AtualizarDadosUsuario";

export const usuarioRoutes = [
  { path: "/login", element: <LoginUsuario /> },
  { path: "/cadastrarUsuario", element: <CadastrarUsuario /> },
  { path: "/minhaConta", element: <MinhaConta/>},
  { path: "/atualizar-senha", element: <AtualizarSenha/>},
  { path: "/atualizar-dados", element: <AtualizarDadosUsuario/>}
];
