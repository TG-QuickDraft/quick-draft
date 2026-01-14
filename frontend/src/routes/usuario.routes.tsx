import { CadastrarUsuario } from "@/pages/cadastros/CadastrarUsuario";
import LoginUsuario from "@/pages/LoginUsuario";
import { MinhaConta } from "@/pages/MinhaConta";

export const usuarioRoutes = [
  { path: "/login", element: <LoginUsuario /> },
  { path: "/cadastrarUsuario", element: <CadastrarUsuario /> },
  { path: "/minhaConta", element: <MinhaConta/>}
];
