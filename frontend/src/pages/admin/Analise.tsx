import Title from "@/components/common/ui/Title";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

// Dados mockados - substitua por dados de api real no futuro
const mockData = {
  lucroMensal: [1200, 1900, 3000, 2500, 4200, 3800],
  servicosAbertos: [12, 19, 8, 15, 22, 17],
  usuariosAtivos: {
    clientes: 120,
    freelancers: 45,
  }
};

export const Analise = () => {
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

  // Linha - Lucro
  const lucroData = {
    labels: meses,
    datasets: [
      {
        label: "Lucro (R$)",
        data: mockData.lucroMensal,
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79,70,229,0.2)",
        tension: 0.4,
      },
    ],
  };

  // Coluna - Serviços
  const servicosData = {
    labels: meses,
    datasets: [
      {
        label: "Serviços Abertos",
        data: mockData.servicosAbertos,
        backgroundColor: "#08a000",
      },
    ],
  };

  // Pizza - Usuários
  const usuariosData = {
    labels: ["Clientes", "Freelancers"],
    datasets: [
      {
        data: [
          mockData.usuariosAtivos.clientes,
          mockData.usuariosAtivos.freelancers,
        ],
        backgroundColor: ["#0060fc", "#fa9200"],
      },
    ],
  };

  return (
    <div className="flex flex-col gap-10 p-8 w-full">
      <Title>Análise</Title>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white shadow-sm rounded-lg p-24 h-40 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm text-gray-500">Lucro Total</h3>
          <p className="text-xl font-bold text-indigo-600">
            R$ {mockData.lucroMensal.reduce((a, b) => a + b, 0)}
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-24 h-40 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm text-gray-500">Serviços Abertos</h3>
          <p className="text-xl font-bold text-green-600">
            {mockData.servicosAbertos.reduce((a, b) => a + b, 0)}
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-24 h-40 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm text-gray-500">Usuários Ativos</h3>
          <p className="text-xl font-bold text-blue-600">
            {mockData.usuariosAtivos.clientes +
              mockData.usuariosAtivos.freelancers}
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-24 h-40 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm text-gray-500 mb-2">
            Usuários Ativos
          </h3>
          <div className="w-32">
            <Pie data={usuariosData} />
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="mb-4 font-semibold">Lucro Mensal</h3>
          <Line data={lucroData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="mb-4 font-semibold">Serviços Abertos</h3>
          <Bar data={servicosData} />
        </div>
        
      </div>
    </div>
  );
};
