import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home/Home'
import { PesquisaFreelancer } from './pages/PesquisaFreelancer/PesquisaFreelancer';
import "./App.css";
import { CadastrarFreelancer } from './pages/CadastrarFreelancer/CadastrarFreelancer';
import { PerfilFreelancer } from './pages/PerfilFreelancer/PerfilFreelancer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pesquisaFreelancer" element={<PesquisaFreelancer />} />
        <Route path="/cadastrarFreelancer" element={<CadastrarFreelancer/>} />
        <Route path="/perfilFreelancer/:id" element={<PerfilFreelancer/>} />
      </Routes>
    </Router>
  )
}

export default App;