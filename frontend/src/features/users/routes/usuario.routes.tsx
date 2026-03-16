import { CadastrarUsuario } from "@/features/users/pages/CadastrarUsuario";
import LoginUsuario from "@/features/auth/pages/LoginUsuario";
import { MinhaConta } from "@/features/auth/pages/MinhaConta";
import { AtualizarSenha } from "@/features/auth/pages/AtualizarSenha";
import { AtualizarDadosUsuario } from "@/features/auth/pages/AtualizarDadosUsuario";
import { usuarioPaths } from "@/features/users/routes/usuarioPaths";

export const usuarioRoutes = [
  { path: usuarioPaths.login, element: <LoginUsuario /> },
  { path: usuarioPaths.cadastrarUsuario, element: <CadastrarUsuario /> },
  { path: usuarioPaths.minhaConta, element: <MinhaConta /> },
  { path: usuarioPaths.atualizarSenha, element: <AtualizarSenha /> },
  { path: usuarioPaths.atualizarDados, element: <AtualizarDadosUsuario /> }
];
