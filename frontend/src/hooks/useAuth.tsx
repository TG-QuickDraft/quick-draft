import { createContext, useContext, useEffect, useState } from "react";
import { localStorageKeys } from "@/utils/localStorageKeys";
import { useLocation, useNavigate } from "react-router-dom";
import type { IUserProvider, UserLogin } from "@/domain/models/Login";

export const AuthContext = createContext({} as IUserProvider);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserLogin>({} as UserLogin);
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

  const isAuthenticated = !!user.email;
  const publicRoutes = ["/"];

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      navigate("/", { replace: true });
    }

    if (isAuthenticated && publicRoutes.includes(pathname)) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, pathname, navigate, loading]);

  const logout = () => {
    localStorage.removeItem(localStorageKeys.user);
    localStorage.removeItem(localStorageKeys.accessToken);

    setUser({} as UserLogin);
  };

  return (
    <AuthContext.Provider value={{ logout, user, setUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
