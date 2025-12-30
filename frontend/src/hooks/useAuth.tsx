import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { localStorageKeys } from "@/utils/localStorageKeys";
import type { IUserProvider, LoginRequest } from "@/domain/models/Login";
import { loginApi } from "@/api/auth.api";

export const AuthContext = createContext({} as IUserProvider);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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
    setLoading(false);
  }, []);

  const login = async (loginRequest: LoginRequest) => {
    const { token } = await loginApi(loginRequest);

    localStorage.setItem(localStorageKeys.accessToken, token);
  }

  const logout = () => {
    localStorage.removeItem(localStorageKeys.accessToken);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {loading ? null : !isAuthenticated && !publicRoutes.includes(pathname) ? (
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
