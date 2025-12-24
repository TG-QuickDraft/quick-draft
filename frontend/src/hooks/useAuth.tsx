import { createContext, useContext, useEffect, useState } from "react";
import { localStorageKeys } from "@/utils/localStorageKeys";

export const AuthContext = createContext({});
import type { Usuario } from "@/domain/models/Usuario";

import { useLocation, useNavigate } from "react-router-dom";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Usuario>({} as Usuario);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const pathname = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem(localStorageKeys.user);
    if (user) {
      setUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const isAuthenticated = !!user.id;
  const publicRoutes = ["/"];

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, pathname, navigate, loading]);

  const logout = () => {
    localStorage.removeItem(localStorageKeys.user);
    localStorage.removeItem(localStorageKeys.accessToken);

    setUser({} as Usuario);
  };

  return (
    <AuthContext.Provider value={{ logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
