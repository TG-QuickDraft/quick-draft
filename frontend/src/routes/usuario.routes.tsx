import { CadastrarUsuario } from "@/pages/cadastros/CadastrarUsuario";
import { LoginUsuario } from "@/pages/LoginUsuario";
export const usuarioRoutes = [
  { path: "/cadastrarUsuario", element: <CadastrarUsuario /> },
  { path: "/loginUsuario", element: <LoginUsuario /> }
];
