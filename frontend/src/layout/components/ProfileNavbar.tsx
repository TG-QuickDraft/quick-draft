import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import { GoPlus } from "react-icons/go";
import { FaChartBar } from "react-icons/fa";
import { MdOutlineFactCheck } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import { useAuth } from "@/features/auth/hooks/useAuth";

import { freelancerPaths } from "@/features/freelancers/routes/freelancerPaths";
import { adminPaths } from "@/features/admin/routes/adminPaths";
import { clientePaths } from "@/features/clients/routes/clientePaths";
import { servicoPaths } from "@/features/services/routes/servicoPaths";
import { usuarioPaths } from "@/features/users/routes/usuarioPaths";
import { homePaths } from "@/features/home/routes/homePaths";

import { IoChatboxEllipsesOutline } from "react-icons/io5";

const ProfileNavbar = ({ photoPath }: { photoPath?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { isAuthenticated, roles, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate(homePaths.home);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 cursor-pointer"
      >
        <ProfilePhoto size="sm" photoPath={photoPath ?? ""} />
      </button>

      <div
        className={clsx(
          "absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-200",
          "transition-all duration-200 ease-in-out z-50",
          "text-gray-800",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none",
        )}
      >
        <div className="flex flex-col py-2 text-sm">
          {!isAuthenticated && (
            <button
              onClick={() => handleNavigate(usuarioPaths.login)}
              className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition cursor-pointer"
            >
              <CiLogin size={18} />
              <span>Entrar</span>
            </button>
          )}

          {isAuthenticated && (
            <>
              <button
                onClick={() => handleNavigate(usuarioPaths.minhaConta)}
                className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition cursor-pointer"
              >
                <CiUser size={18} />
                <span>Minha Conta</span>
              </button>

              <button
                onClick={() => handleNavigate(servicoPaths.chatServico)}
                className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition cursor-pointer"
              >
                <IoChatboxEllipsesOutline size={18} />
                <span>Chat</span>
              </button>

              {roles.includes("Admin") && (
                <>
                  <button
                    onClick={() => handleNavigate(adminPaths.analise)}
                    className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition cursor-pointer"
                  >
                    <FaChartBar size={18} />
                    <span>Tela de Análise</span>
                  </button>

                  <button
                    onClick={() => handleNavigate(adminPaths.auditoria)}
                    className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition cursor-pointer"
                  >
                    <MdOutlineFactCheck size={18} />
                    <span>Auditoria</span>
                  </button>
                </>
              )}

              {roles.includes("Cliente") && (
                <>
                  <button
                    onClick={() =>
                      handleNavigate(servicoPaths.cadastrarServico)
                    }
                    className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition cursor-pointer"
                  >
                    <GoPlus size={18} />
                    <span>Cadastrar Serviço</span>
                  </button>

                  <button
                    onClick={() =>
                      handleNavigate(clientePaths.cadastrarCartaoCredito)
                    }
                    className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition cursor-pointer"
                  >
                    <GoPlus size={18} />
                    <span>Cadastrar Cartão de Crédito</span>
                  </button>
                </>
              )}

              {roles.includes("Freelancer") && (
                <>
                  <button
                    onClick={() =>
                      handleNavigate(freelancerPaths.cadastrarProjetoFreelancer)
                    }
                    className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition cursor-pointer"
                  >
                    <GoPlus size={18} />
                    <span>Cadastrar Projeto Freelancer</span>
                  </button>

                  <button
                    onClick={() =>
                      handleNavigate(freelancerPaths.cadastrarContaBancaria)
                    }
                    className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition cursor-pointer"
                  >
                    <GoPlus size={18} />
                    <span>Cadastrar Conta Bancária</span>
                  </button>
                </>
              )}

              <div className="border-t border-gray-200 my-2" />

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-left w-full hover:bg-red-50 text-red-500 transition cursor-pointer"
              >
                <CiLogout size={18} />
                <span>Sair</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileNavbar;
