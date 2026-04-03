import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { localStorageKeys } from "@/shared/utils/storageKeys";
import { loginApi } from "@/features/auth/api/auth.api";
import { getRolesFromToken } from "@/shared/utils/getRolesFromToken";
import type { LoginDTO } from "@/features/auth/dtos/LoginDTO";
import type { UsuarioDTO } from "@/features/users/dtos/UsuarioDTO";
import { consultarUsuario } from "@/features/users/api/usuario.api";
import Spinner from "@/shared/components/ui/Spinner";

import { servicoPaths } from "@/features/services/routes/servicoPaths";
import { clientePaths } from "@/features/clients/routes/clientePaths";
import { freelancerPaths } from "@/features/freelancers/routes/freelancerPaths";
import { usuarioPaths } from "@/features/users/routes/usuarioPaths";
import { homePaths } from "@/features/home/routes/homePaths";
import { authPaths } from "../routes/authPaths";
import type { Role } from "@/shared/types/Roles";

interface IUserProvider {
  isAuthenticated: boolean;
  login: (loginDTO: LoginDTO) => Promise<void>;
  logout: () => void;
  roles: Role[];
  usuario: UsuarioDTO | null;
}

export const AuthContext = createContext({} as IUserProvider);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [roles, setRoles] = useState<Role[]>([]);

  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<UsuarioDTO | null>(null);

  const location = useLocation();
  const pathname = location.pathname;

  const publicRoutes = [
    homePaths.home,
    authPaths.login,
    freelancerPaths.pesquisaFreelancer,
    freelancerPaths.perfilFreelancer,
    clientePaths.perfilCliente,
    servicoPaths.pesquisaServico,
    servicoPaths.visualizarServico,
    usuarioPaths.cadastrarUsuario,
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
      const dadosUsuario: UsuarioDTO = await consultarUsuario();
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

  const isPublicRoute = publicRoutes.some((route) => {
    if (route === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(route);
  });

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, roles, usuario }}
    >
      {loading ? (
        <Spinner />
      ) : !isAuthenticated && !isPublicRoute ? (
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
