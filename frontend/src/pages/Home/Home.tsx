import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

export const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div>
        <div className="flex flex-col gap-3">
          <Link to={"/pesquisaFreelancer"}>
            <Button>Pesquisar freelancers</Button>
          </Link>
          <Link to={"/cadastrarFreelancer"}>
            <Button>Cadastrar Freelancer</Button>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3 className="p-6">Testes Cypress</h3>
          <Button
            className="w-full"
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
