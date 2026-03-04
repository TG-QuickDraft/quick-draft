import Stack from "@/shared/components/Stack";
import Button from "@/shared/components/ui/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import clsx from "clsx";
import Search from "@/shared/components/ui/Inputs/Search";
import Select from "@/shared/components/ui/Select";

import ProfileNavbar from "@/layout/components/ProfileNavbar";
import SystemLogo from "@/shared/components/ui/SystemLogo";
import { useState } from "react";

const Navbar = () => {
  const { logout, isAuthenticated, usuario } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("freelancers");

  const Logo = () => {
    return (
      <div className="w-12 h-12 rounded-full bg-gray-200">
        <SystemLogo
          size="sm"
        />
      </div>
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
        <Logo />
        <div className="flex gap-2 items-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (tipo === "freelancers") {
                navigate(`/pesquisaFreelancer?nome=${search}`);
              } else {
                navigate(`/pesquisaServico?nome=${search}`);
              }
            }}
            className="flex gap-2 items-center"
          >
            <Search
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              placeholder="Pesquise..."
              className="w-40! md:w-80! lg:w-100!"
            />

            <Select
              value={tipo}
              onChange={(value: string) => setTipo(value)}
              options={[
                { value: "freelancers", label: "Freelancers" },
                { value: "serviços", label: "Serviços" },
              ]}
            />
          </form>
        </div>
      </Stack>
      <Stack direction="row" gap={6}>
        {renderButtons()}
        <ProfileNavbar 
          photoPath={usuario ? usuario.fotoPerfilUrl : ""}
        />
      </Stack>
    </div>
  );
};

export default Navbar;
