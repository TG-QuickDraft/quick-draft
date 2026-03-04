import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import { GoPlus } from "react-icons/go";
import { FaChartBar } from "react-icons/fa";
import { MdOutlineFactCheck } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";

import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import { useAuth } from "@/features/auth/hooks/useAuth";

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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      {/* Foto */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-12 h-12 rounded-full overflow-hidden bg-gray-200"
      >
        <ProfilePhoto size="sm" photoPath={photoPath ?? ""} />
      </button>

      {/* Dropdown */}
      <div
        className={clsx(
          "absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-200",
          "transition-all duration-200 ease-in-out z-50",
          "text-gray-800",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="flex flex-col py-2 text-sm">

          {/* NÃO LOGADO */}
          {!isAuthenticated && (
            <button
                onClick={() => handleNavigate("/login")}
                className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition"
                >
                <CiLogin size={18} />
                <span>Entrar</span>
            </button>
          )}

          {/* LOGADO */}
          {isAuthenticated && (
            <>
              <button
                onClick={() => handleNavigate("/minhaConta")}
                className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition"
                >
                <CiUser size={18} />
                <span>Minha Conta</span>
              </button>

              {/* ADMIN */}
              {roles.includes("Admin") && (
                <>
                  <button
                    onClick={() => handleNavigate("/analise")}
                    className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition"
                  >
                  <FaChartBar size={18} />
                  <span>Tela de Análise</span>
                  </button>

                  <button
                    onClick={() => handleNavigate("/auditoria")}
                    className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition"
                  >
                  <MdOutlineFactCheck size={18} />
                  <span>Auditoria</span>
                  </button>
                </>
              )}

              {/* CLIENTE */}
              {roles.includes("Cliente") && (
                <>
                  <button
                    onClick={() => handleNavigate("/cadastrarServico")}
                    className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition"
                  >
                  <GoPlus size={18} />
                  <span>Cadastrar Serviço</span>
                  </button>

                  <button
                    onClick={() =>
                      handleNavigate("/cadastrarCartaoCredito")
                    }
                    className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition"
                  >
                  <GoPlus size={18} />
                  <span>Cadastrar Cartão de Crédito</span>
                  </button>
                </>
              )}

              {/* FREELANCER */}
              {roles.includes("Freelancer") && (
                <>
                  <button
                    onClick={() =>
                      handleNavigate("/cadastrarProjetoFreelancer")
                    }
                    className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition"
                  >
                  <GoPlus size={18} />
                  <span>Cadastrar Projeto Freelancer</span>
                  </button>

                  <button
                    onClick={() =>
                      handleNavigate("/cadastrarContaBancaria")
                    }
                    className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition"
                  >
                  <GoPlus size={18} />
                  <span>Cadastrar Conta Bancária</span>
                  </button>
                </>
              )}

              <div className="border-t border-gray-200 my-2" />

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-left w-full hover:bg-red-50 text-red-500 transition"
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