import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { localStorageKeys } from "@/utils/localStorageKeys";
import { loginApi } from "@/api/auth.api";
import { getRolesFromToken } from "@/utils/getRolesFromToken";
import type { LoginDTO } from "@/dtos/login/LoginDTO";
import type { Usuario } from "@/domain/models/Usuario";
import { consultarUsuario } from "@/api/usuario.api";

interface IUserProvider {
  isAuthenticated: boolean;
  login: (loginDTO: LoginDTO) => Promise<void>;
  logout: () => void;
  roles: string[];
  usuario: Usuario | null;
}

export const AuthContext = createContext({} as IUserProvider);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [roles, setRoles] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const location = useLocation();
  const pathname = location.pathname;

  const publicRoutes = [
    "/",
    "/login",
    "/pesquisaFreelancer",
    "/perfilFreelancer",
    "/perfilCliente",
    "/pesquisaServico",
    "/visualizarServico",
    "/cadastrarUsuario",
  ];

  const isAuthenticated = !!localStorage.getItem(localStorageKeys.accessToken);

  useEffect(() => {
    if (isAuthenticated) {
      setRoles(getRolesFromToken());
    }
    setLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      setUsuario(null);
      return;
    }

    const obterDadosUsuario = async () => {
      const dadosUsuario: Usuario = await consultarUsuario();
      setUsuario(dadosUsuario);
    };
    obterDadosUsuario();
  }, [isAuthenticated]);

  const login = async (login: LoginDTO) => {
    const { token } = await loginApi(login);

    localStorage.setItem(localStorageKeys.accessToken, token);

    setRoles(getRolesFromToken());
  };

  const logout = () => {
    localStorage.removeItem(localStorageKeys.accessToken);
  };

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, roles, usuario }}
    >
      {loading ? null : !isAuthenticated && !isPublicRoute ? (
        <Navigate to="/login" replace />
      ) : isAuthenticated && pathname === "/login" ? (
        <Navigate to="/" replace />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
