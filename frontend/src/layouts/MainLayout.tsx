import Button from "@/components/common/Button";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "@/hooks/useAuth";

import { useNavigate, useLocation } from "react-router-dom";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return (
      <>
        {children}
        <Button
          icon={<CiLogout size={20} />}
          variant="danger"
          className="fixed top-6 right-6"
          onClick={logout}
        >
          Sair
        </Button>
      </>
    );
  }

  if (location.pathname !== "/login") {
    return (
      <>
        {children}
        <Button
          icon={<CiLogout size={20} />}
          variant="primary"
          className="fixed top-6 right-6"
          onClick={() => navigate("/login")}
        >
          Entrar
        </Button>
      </>
    );
  }

  return (
    <>
      {children}
      <Button
        icon={<CiLogout size={20} />}
        variant="primary"
        className="fixed top-6 right-6"
        onClick={() => navigate("/")}
      >
        Voltar
      </Button>
    </>
  );
};

export default MainLayout;
