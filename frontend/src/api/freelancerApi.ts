import type { Freelancer } from "../models/Freelancer";

const PATH = "http://localhost:5191/api/Freelancer";

export const consultarFreelancers = async () => {
    const resposta = await fetch(PATH);

    if (resposta.status !== 200){
        throw new Error("Erro ao consultar freelancers.");
    }

    const freelancers : Freelancer[] = await resposta.json();

    return freelancers;
}