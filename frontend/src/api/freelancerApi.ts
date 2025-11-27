import type { Freelancer } from "../models/Freelancer";

const PATH = `${import.meta.env.VITE_API_URL}/api/Freelancer`;

export const consultarFreelancers = async () => {
    const resposta = await fetch(PATH);

    if (resposta.status !== 200){
        throw new Error("Erro ao consultar freelancers.");
    }

    const freelancers : Freelancer[] = await resposta.json();

    return freelancers;
}