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

import ProfilePhoto from "@/components/common/ui/ProfilePhoto";

const Navbar = () => {
  const { logout, isAuthenticated, usuario } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const HomeButton = () => {
    if (location.pathname === "/") {
      return (
        <div className="w-12 h-12 rounded-full bg-gray-200">
          <ProfilePhoto
            size="sm"
            photoPath={usuario ? usuario.fotoPerfilUrl : ""}
          />
        </div>
      );
    }

    return (
      <Link to="/old-home">
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
        "text-white bg-white shadow-lg",
      )}
    >
      <Stack direction="row" gap={6}>
        <HomeButton />
        <div className="flex gap-2 items-center">
          <Search
            placeholder="Pesquise..."
            className="w-40! md:w-80! lg:w-100!"
          />
          <Select
            value="freelancers"
            options={[
              { value: "freelancers", label: "Freelancers" },
              { value: "serviços", label: "Serviços" },
            ]}
          />
        </div>
      </Stack>
      <Stack direction="row" gap={6}>
        {renderButtons()}
      </Stack>
    </div>
  );
};

export default Navbar;
