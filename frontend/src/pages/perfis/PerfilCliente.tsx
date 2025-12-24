import { Link, useParams } from "react-router-dom";
import { consultarClientePorId } from "@/api/cliente.api";

import { useEffect, useState } from "react";

import Title from "@/components/common/Title";

import Button from "@/components/common/Button";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import type { Cliente } from "@/domain/models/Cliente";

export const PerfilCliente = () => {
  const { id } = useParams();

  const [cliente, setCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    const obterDados = async () => {
      const data = await consultarClientePorId(Number(id));

      if (data !== undefined) {
        setCliente(data);
      }
    };

    obterDados();
  }, [id]);

  useEffect(() => {
    console.log(cliente);
  }, [cliente]);

  // HOOK FORM YUP VALIDATION

  /**
   * export const useValidation = () => {
    return yup.object().shape({
        nome: yup.string().required('Por favor, digite o seu nome!'),
        email: yup.string().email('Por favor, digite um e-mail válido!').required('Por favor digite seu e-mail'),
        telefone: yup.string().required('Por favor, informe o seu telefone'),
        cep: yup.string().required('Por favor, informe o seu código postal (CEP)'),
    })
}
   * 
   */

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <Title>Página de Perfil do Cliente</Title>
        <h3>{cliente?.nome}</h3>

        {cliente?.fotoPerfilUrl ? (
          <img
            className="rounded-full shadow-xl"
            src={cliente?.fotoPerfilUrl ? cliente.fotoPerfilUrl : ""}
            height={200}
          />
        ) : (
          <div className="bg-black w-50 h-50 rounded-full" />
        )}

        <Link to={"/home"}>
          <Button
            className="mt-6"
            icon={<MdKeyboardDoubleArrowLeft size={30} />}
          >
            Voltar
          </Button>
        </Link>
      </div>
    </div>
  );
};
