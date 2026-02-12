import type { CriarContaBancariaDTO } from "@/dtos/contaBancaria/CriarContaBancariaDTO";
import { localStorageKeys } from "@/utils/localStorageKeys";

const PATH = `${import.meta.env.VITE_API_URL}/api/contaBancaria`;

export const adicionarContaBancaria = async (conta: CriarContaBancariaDTO) => {
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
        },
        body: JSON.stringify(conta),
    };

    const resposta = await fetch(PATH, option);

    if (resposta.status !== 201) {
        throw new Error("Erro ao adicionar conta.");
    }

    return resposta.json();
}