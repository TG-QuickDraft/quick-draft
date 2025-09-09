import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import type { Freelancer } from './models/Freelancer';
import { consultarFreelancers } from './api/freelancerApi';

function App() {

  // TODO: retirar código do template

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

  const [count, setCount] = useState(0)

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

      <br/>
      <br/>
      <br/>
      <br/>
      
      <h1>E as coisas do React aqui em baixo</h1>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
