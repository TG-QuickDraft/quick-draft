import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";

import { IoIosSearch } from "react-icons/io";
import { GoPlus } from "react-icons/go";
export const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div>
        <div className="flex flex-col gap-3">
          <Link to={"/pesquisaFreelancer"}>
            <Button icon={<IoIosSearch size={30} />}>
              Pesquisar freelancers
            </Button>
          </Link>
          <Link to={"/cadastrarFreelancer"}>
            <Button icon={<GoPlus size={30} />}>Cadastrar Freelancer</Button>
          </Link>
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
