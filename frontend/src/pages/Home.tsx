import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "@/components/common/ui/Button";

import { IoIosSearch } from "react-icons/io";
import { GoPlus } from "react-icons/go";

import { useAuth } from "@/hooks/useAuth";
export const Home = () => {
  const [count, setCount] = useState(0);
  const { isAuthenticated } = useAuth();

  const { roles } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-full">
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
            <Link to={"/cadastrarServico"}>
              <Button icon={<GoPlus size={30} />}>Cadastrar serviço</Button>
            </Link>
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
