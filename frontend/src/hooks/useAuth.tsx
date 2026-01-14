import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { localStorageKeys } from "@/utils/localStorageKeys";
import { loginApi } from "@/api/auth.api";
import { getRolesFromToken } from "@/utils/getRolesFromToken";
import type { LoginDTO } from "@/dtos/login/LoginDTO";

interface IUserProvider {
  isAuthenticated: boolean;
  login: (loginDTO: LoginDTO) => Promise<void>;
  logout: () => void;
  roles: string[];
}

export const AuthContext = createContext({} as IUserProvider);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [roles, setRoles] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

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

  const isAuthenticated = !!localStorage.getItem(
    localStorageKeys.accessToken
  );

  useEffect(() => {
    if (isAuthenticated) {
      setRoles(getRolesFromToken());
    }
    setLoading(false);
  }, [isAuthenticated]);

  const login = async (login: LoginDTO) => {
    const { token } = await loginApi(login);

    localStorage.setItem(localStorageKeys.accessToken, token);

    setRoles(getRolesFromToken());
  }

  const logout = () => {
    localStorage.removeItem(localStorageKeys.accessToken);
  };

  const isPublicRoute = publicRoutes.some(route =>
    pathname.startsWith(route)
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, roles }}>
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
