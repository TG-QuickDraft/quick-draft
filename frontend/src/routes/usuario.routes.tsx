import { CadastrarUsuario } from "@/pages/cadastros/CadastrarUsuario";
import LoginUsuario from "@/pages/LoginUsuario";

export const usuarioRoutes = [
  { path: "/login", element: <LoginUsuario />, private: false },
  { path: "/cadastrarUsuario", element: <CadastrarUsuario />, private: true },
];
