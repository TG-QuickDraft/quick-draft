import { CadastrarUsuario } from "@/pages/cadastros/CadastrarUsuario";
import LoginUsuario from "@/pages/LoginUsuario";

export const usuarioRoutes = [
  { path: "/login", element: <LoginUsuario /> },
  { path: "/cadastrarUsuario", element: <CadastrarUsuario /> },
];
