import { atualizarSenha, consultarUsuario } from "@/api/usuario.api";
import Button from "@/components/common/Button";

import Input from "@/components/common/Inputs/Input";
import type { Usuario } from "@/domain/models/Usuario";
import { useEffect, useState } from "react";

export const MinhaConta = () => {
    
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const [novaSenha, setNovaSenha] = useState<string>("");
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState<string>("");

    useEffect(() => {
        const obterDadosUsuario = async () => {
            const dadosUsuario: Usuario = await consultarUsuario();

            setUsuario(dadosUsuario);
        };

        obterDadosUsuario();
    }, []);

    const submitEnviarSenha = async () => {
        try {
            const resposta = await atualizarSenha({
                novaSenha: novaSenha,
                confirmarNovaSenha: confirmarNovaSenha
            });

            alert(resposta.mensagem);
        } catch (error){
            if (error instanceof Error){
                alert(error.message);
            }
        }
    }
    
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

            <form>
                <label>Nova senha:</label>
                <Input
                    name="senha"
                    type="password"
                    placeholder="Sua nova senha"
                    onChange={(e) => setNovaSenha(e.target.value)}
                />

                <label>Confirmar senha:</label>
                <Input
                    name="confirmarSenha"
                    type="password"
                    placeholder="Confirme sua nova senha"
                    onChange={(e) => {
                        setConfirmarNovaSenha(e.target.value);
                    }}
                />
                <Button type={"button"} onClick={submitEnviarSenha}>Salvar</Button>
            </form>
        </div>
    );
}