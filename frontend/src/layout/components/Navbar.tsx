import Stack from "@/shared/components/Stack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import clsx from "clsx";
import Search from "@/shared/components/ui/Inputs/Search";
import Select from "@/shared/components/ui/Select";

import ProfileNavbar from "@/layout/components/ProfileNavbar";
import SystemLogo from "@/shared/components/ui/SystemLogo";
import { useState } from "react";

import { freelancerPaths } from "@/features/freelancers/routes/freelancerPaths";
import { proposalPaths } from "@/features/services/proposal/routes/proposalPaths";

const Navbar = () => {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("freelancers");

  const Logo = () => {
    return (
      <div className="w-12 h-12 rounded-full bg-gray-200">
        <SystemLogo size="sm" />
      </div>
    );
  };

  return (
    <div
      className={clsx(
        "flex justify-between p-8",
        "border-b border-white/20",
        "text-white bg-white shadow-lg",
        "z-30",
      )}
    >
      <Stack direction="row" gap={6}>
        <Logo />
        <div className="flex gap-2 items-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (tipo === "freelancers") {
                navigate(
                  freelancerPaths.pesquisaFreelancer + `?nome=${search}`,
                );
              } else {
                navigate(proposalPaths.pesquisaServico + `?nome=${search}`);
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
        <ProfileNavbar photoPath={usuario?.fotoPerfilUrl} />
      </Stack>
    </div>
  );
};

export default Navbar;
