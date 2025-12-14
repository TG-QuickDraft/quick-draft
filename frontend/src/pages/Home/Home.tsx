import { useState } from "react";
import { Link } from "react-router-dom";
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import { ComponenteMarkdown } from "../../components/ComponenteMarkdown";

export const Home = () => {
    const [count, setCount] = useState(0)

    return (
        <>
            <Link to={"/pesquisaFreelancer"}>
                <button style={{backgroundColor: 'white', color: 'black'}}>
                    Pesquisar freelancers
                </button>
            </Link>

            <Link to={"/cadastrarFreelancer"}>
                <button style={{backgroundColor: 'white', color: 'black'}}>
                    Cadastrar Freelancer
                </button>
            </Link>

            <hr/>

            <h3>Testes Cypress</h3>

            <div>
                <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>

            <div className="card">
                <button id="oh" onClick={() => setCount((count) => count + 1)}>
                count is {count}
                </button>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>

            <ComponenteMarkdown/>
        </>
    );
}