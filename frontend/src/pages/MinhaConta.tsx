import { consultarUsuario } from "@/api/usuario.api";
import Button from "@/components/common/Button";

import Input from "@/components/common/Inputs/Input";
import type { Usuario } from "@/domain/models/Usuario";
import { useEffect, useState } from "react";

export const MinhaConta = () => {
    
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const obterDadosUsuario = async () => {
            const dadosUsuario: Usuario = await consultarUsuario();

            setUsuario(dadosUsuario);
        };

        obterDadosUsuario();
    }, []);
    
    return (
        <div>
            Página de Conta

            {usuario && (
                <div>
                    <h2>Nome: {usuario.nome}</h2>
                    <h3>Email: {usuario.email}</h3>
                    <h3>CPF: {usuario.cpf}</h3>
                    {usuario.fotoPerfilUrl && (
                        <img src={usuario.fotoPerfilUrl} alt="Foto de Perfil" />
                    )}
                </div>
            )}

            <form>
                <label>Nome:</label>
                <Input type="text" value={usuario?.nome || ""} />

                <label>Email:</label>
                <Input type="email" value={usuario?.email || ""} />

                <label>CPF:</label>
                <Input type="text" value={usuario?.cpf || ""} />

                <Button>Salvar</Button>
            </form>
        </div>
    );
}