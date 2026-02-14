import Stack from "@/components/common/Stack";
import Button from "@/components/common/ui/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { useAuth } from "@/hooks/useAuth";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import clsx from "clsx";
import Search from "@/components/common/ui/Inputs/Search";
import Select from "@/components/common/ui/Select";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const HomeButton = () => {
    return (
      <Link to="/">
        <Button icon={<GoHome />}>HOME</Button>
      </Link>
    );
  };

  const renderButtons = () => {
    if (isAuthenticated) {
      return (
        <>
          <Link to="/minhaConta">
            <Button>Minha Conta</Button>
          </Link>
          <Button
            icon={<CiLogout size={20} />}
            variant="danger"
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
          <Button
            icon={<CiLogin size={20} />}
            variant="primary"
            onClick={() => navigate("/login")}
          >
            Entrar
          </Button>
        </>
      );
    }

    return (
      <>
        <Button
          icon={<MdKeyboardDoubleArrowLeft size={25} />}
          variant="primary"
          onClick={() => navigate("/")}
        >
          Voltar
        </Button>
      </>
    );
  };

  return (
    <div
      className={clsx(
        "flex justify-between p-8",
        "border-b border-white/20",
        "text-white bg-black/30 shadow-lg",
      )}
    >
      <Stack direction="row" gap={6}>
        <HomeButton />
        <Search placeholder="Digite..." />
        <Select
          value="freelancers"
          options={[
            { value: "freelancers", label: "Freelancers" },
            { value: "serviços", label: "Serviços" },
          ]}
        />
      </Stack>
      <Stack direction="row" gap={6}>
        {renderButtons()}
      </Stack>
    </div>
  );
};

export default Navbar;
