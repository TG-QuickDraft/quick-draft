import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home/Home'
import { PesquisaFreelancer } from './pages/PesquisaFreelancer/PesquisaFreelancer';
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pesquisaFreelancer" element={<PesquisaFreelancer />} />
      </Routes>
    </Router>
  )
}

export default App;