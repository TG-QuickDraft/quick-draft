import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <>
            <Link to={"/pesquisaFreelancer"}>
                <button style={{backgroundColor: 'white', color: 'black'}}>
                    Pesquisar freelancers
                </button>
            </Link>
        </>
    );
}