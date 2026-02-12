import Button from "@/components/common/ui/Button";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "@/hooks/useAuth";

import { useNavigate, useLocation, Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { GoHome } from "react-icons/go";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const HomeButton = () => {
    return (
      <Link
        to="/"
        className="fixed top-6 left-6"
      >
        <Button icon={<GoHome/>}>HOME</Button>
      </Link>
    );
  }

  if (isAuthenticated) {
    return (
      <>
        {children}

        <HomeButton/>

        <Link
          className="fixed top-6 right-36"
          to="/minhaConta"
        >
          <Button>Minha Conta</Button>
        </Link>
        
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

        <HomeButton/>

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

      <HomeButton/>

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
