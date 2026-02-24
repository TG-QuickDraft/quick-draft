import { CadastrarUsuario } from "@/features/users/pages/CadastrarUsuario";
import LoginUsuario from "@/features/auth/pages/LoginUsuario";
import { MinhaConta } from "@/pages/MinhaConta";

export const usuarioRoutes = [
  { path: "/login", element: <LoginUsuario /> },
  { path: "/cadastrarUsuario", element: <CadastrarUsuario /> },
  { path: "/minhaConta", element: <MinhaConta/>}
];
