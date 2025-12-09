import { useParams } from "react-router-dom";
import { consultarFreelancerPorId } from "../../api/freelancerApi";
import type { Freelancer } from "../../models/Freelancer";
import { useEffect, useState } from "react";

export const PerfilFreelancer = () => {
    const { id } = useParams();

    const [freelancer, setFreelancer] = useState<Freelancer | null>(null);

    useEffect(() => {
        const obterDados = async () => {

            const data = await consultarFreelancerPorId(Number(id));

            if (data !== undefined) {
                setFreelancer(data);
            }

        };

        obterDados();
    }, [id]);

    return (
        <div>
            <h1>Página de Perfil do Freelancer</h1>

            <h3>{freelancer?.nome}</h3>

            <img
                src={freelancer?.fotoPerfilUrl ? freelancer.fotoPerfilUrl : ""}
                height={200}
            />
        </div>
    )
}