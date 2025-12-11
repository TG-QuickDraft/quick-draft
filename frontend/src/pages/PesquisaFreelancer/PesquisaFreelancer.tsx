import { useEffect, useState } from "react";
import "./PesquisaFreelancer.css";
import type { Freelancer } from "../../models/Freelancer";
import { consultarFreelancers } from "../../api/freelancerApi";
import { Link } from "react-router-dom";

import Button from "../../components/Button";

export function PesquisaFreelancer() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);

  useEffect(() => {
    const obterDados = async () => {
      const dados = await consultarFreelancers();

      if (dados !== undefined) {
        setFreelancers(dados);
      }
    };

    obterDados();
  }, []);

  return (
    <>
      <h1 className="pb-6">Minha tabela de freelancers</h1>
      <table id="tabela-incrivel">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Foto de Perfil</th>
            <th>Ir para Perfil</th>
          </tr>
        </thead>
        <tbody>
          {freelancers.length > 0 ? (
            freelancers.map((freelancer, index) => (
              <tr key={index}>
                <td>{freelancer.id}</td>
                <td>{freelancer.nome}</td>
                <td>
                  <img src={freelancer.fotoPerfilUrl} height={200} />
                </td>
                <td>
                  <Link to={`/perfilFreelancer/${freelancer.id}`}>
                    <button>Ver Perfil</button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="py-6">
        <Link to={"/"}>
          <Button>Ir para Home</Button>
        </Link>
      </div>
    </>
  );
}

export default PesquisaFreelancer;
