import type { Freelancer } from "../models/Freelancer";

import { adicionarUsuario } from "./usuarioApi";

const PATH = `${import.meta.env.VITE_API_URL}/api/Freelancer`;

export const consultarFreelancers = async () => {
    const resposta = await fetch(PATH);

    if (resposta.status !== 200){
        throw new Error("Erro ao consultar freelancers.");
    }

    const freelancers : Freelancer[] = await resposta.json();

    return freelancers;
}

export const consultarFreelancerPorId = async (id: number): Promise<Freelancer> => {
    const resposta = await fetch(`${PATH}/${id}`);

    if (resposta.status !== 200){
        throw new Error("Erro ao consultar freelancer.");
    }

    return await resposta.json();
}

export const adicionarFreelancer = async (freelancer: Freelancer) => {
    const usuarioAdicionado = await adicionarUsuario(freelancer);

    freelancer.id = usuarioAdicionado.id;
    
    const option = {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(freelancer)
    }

    const resposta = await fetch(PATH, option);

    if (resposta.status !== 201) {
        throw new Error("Erro ao adicionar freelancer.");
    }

    return resposta.json();
}