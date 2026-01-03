import Button from "@/components/common/Button";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "@/hooks/useAuth";

import { useNavigate, useLocation } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

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
          onClick={() => {
            logout();
            navigate("/");
          }}
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
          icon={<CiLogin size={20} />}
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
        icon={<MdKeyboardDoubleArrowLeft size={25} />}
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
