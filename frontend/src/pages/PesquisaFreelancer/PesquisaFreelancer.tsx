import { useEffect, useState } from 'react'
import './PesquisaFreelancer.css'
import type { Freelancer } from '../../models/Freelancer';
import { consultarFreelancers } from '../../api/freelancerApi';
import { Link } from 'react-router-dom';

export function PesquisaFreelancer() {

  const [freelancers, setFreelancers] = useState<Freelancer[]>(
    []
  );

  useEffect(() => {
    const obterDados = async () => {
      const dados = await consultarFreelancers();

      if (dados !== undefined){
          setFreelancers(dados);    
      }
        
    };

    obterDados();
  }, []);

  return (
    <>
      <h1>Minha tabela de freelancers</h1>
      <table id="tabela-incrivel">
        <thead>
          <th>Id</th>
          <th>Nome</th>
        </thead>
        <tbody>
          {
            freelancers.length > 0 ? 

            freelancers.map((freelancer, index) => (
                <tr key={index}>
                  <td>
                    {freelancer.id}
                  </td>
                  <td>
                    {freelancer.nome}
                  </td>
                </tr>
            ))
            
            :
            
            (
              <tr>
                <td>-</td>
                <td>-</td>
              </tr>
            )
          }
        </tbody>
      </table>

        <Link to={"/"}>
            <button style={{backgroundColor: 'white', color: 'black'}}>
                Ir para Home
            </button>
        </Link>
    </>
  )
}

export default PesquisaFreelancer;