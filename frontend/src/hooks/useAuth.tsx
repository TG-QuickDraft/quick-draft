import { createContext, useContext, useEffect, useState } from "react";
import { localStorageKeys } from "@/utils/localStorageKeys";
import { Navigate, useLocation } from "react-router-dom";
import type { IUserProvider, UserLogin } from "@/domain/models/Login";

export const AuthContext = createContext({} as IUserProvider);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserLogin>({} as UserLogin);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const pathname = location.pathname;

  useEffect(() => {
    const user = localStorage.getItem(localStorageKeys.user);
    if (user) {
      setUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const isAuthenticated = !!user.email;
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

  const logout = () => {
    localStorage.removeItem(localStorageKeys.user);
    localStorage.removeItem(localStorageKeys.accessToken);

    setUser({} as UserLogin);
  };

  return (
    <AuthContext.Provider value={{ logout, user, setUser, isAuthenticated }}>
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
