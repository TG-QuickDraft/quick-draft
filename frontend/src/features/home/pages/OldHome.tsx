import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "@/shared/components/ui/buttons/Button";

import { IoIosSearch } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { MdOutlineFactCheck } from "react-icons/md";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { FaChartBar } from "react-icons/fa";
export const OldHome = () => {
  const [count, setCount] = useState(0);
  const { isAuthenticated } = useAuth();

  const { roles } = useAuth();

  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full">
      <div>
        <div className="flex flex-col gap-3 items-center">
          <Link to={"/pesquisaFreelancer"}>
            <Button icon={<IoIosSearch size={30} />}>
              Pesquisar freelancers
            </Button>
          </Link>
          <Link to={"/pesquisaServico"}>
            <Button icon={<IoIosSearch size={30} />}>Pesquisar serviços</Button>
          </Link>
          <Link to={"/cadastrarUsuario"}>
            <Button icon={<GoPlus size={30} />}>Cadastrar usuário</Button>
          </Link>
          {isAuthenticated && roles.includes("Cliente") && (
            <div className="flex flex-col gap-3 items-center">
              <Link to={"/cadastrarServico"}>
                <Button icon={<GoPlus size={30} />}>Cadastrar serviço</Button>
              </Link>
              <Link to={"/cadastrarCartaoCredito"}>
                <Button icon={<GoPlus size={30} />}>
                  Cadastrar Cartão de Crédito
                </Button>
              </Link>
            </div>
          )}
          {isAuthenticated && roles.includes("Freelancer") && (
            <div className="flex flex-col gap-3 items-center">
              <Link to={"/cadastrarProjetoFreelancer"}>
                <Button icon={<GoPlus size={30} />}>
                  Cadastrar Projeto Freelancer
                </Button>
              </Link>
              <Link to={"/cadastrarContaBancaria"}>
                <Button icon={<GoPlus size={30} />}>
                  Cadastrar Conta Bancária
                </Button>
              </Link>
              <Link to={"/proposal/view"}>
                <Button icon={<GoPlus size={30} />}>Proposta</Button>
              </Link>
            </div>
          )}
          {isAuthenticated && roles.includes("Admin") && (
            <div className="flex flex-col gap-3 items-center">
              <Link to={"/analise"}>
                <Button icon={<FaChartBar size={30} />}>Tela de Análise</Button>
              </Link>
              <Link to={"/auditoria"}>
                <Button icon={<MdOutlineFactCheck size={30} />}>
                  Auditoria
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3 className="p-6">Testes Cypress</h3>
          <Button
            variant="secondary"
            id="oh"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </Button>
        </div>
      </div>
    </div>
  );
};
