import Title from "@/shared/components/ui/titles/Title";
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
import { Line, Bar, Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import api from "@/shared/apis/api";
import DateInput from "@/shared/components/ui/inputs/DateInput";
import { subYears } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

interface AnaliseData {
  meses: string[];
  lucroMensal: number[];
  servicosAbertosMensal: number[];
  lucroTotal: number;
  totalServicosAbertos: number;
  totalServicosEntregues: number;
  servicosEntreguesChart: {
    entregues: number;
    pendentes: number;
  };
}

export const Analise = () => {
  const [data, setData] = useState<AnaliseData | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(subYears(new Date(), 1));
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get<AnaliseData>("/api/Analise", {
          params: {
            startDate: startDate?.toISOString(),
            endDate: endDate?.toISOString(),
          },
        });
        console.log("Dados da análise recebidos:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados de análise:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  if (loading || !data) {
    return (
      <div className="flex flex-col gap-10 p-8 w-full animate-pulse">
        <Title>Análise</Title>
        <div className="text-gray-500">Carregando dados da análise...</div>
      </div>
    );
  }

  // Linha - Lucro
  const lucroData = {
    labels: data.meses,
    datasets: [
      {
        label: "Lucro (R$)",
        data: data.lucroMensal,
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Coluna - Serviços
  const servicosData = {
    labels: data.meses,
    datasets: [
      {
        label: "Serviços Abertos",
        data: data.servicosAbertosMensal,
        backgroundColor: "#08a000",
      },
    ],
  };

  // Pizza - Serviços Entregues
  const entreguesData = {
    labels: ["Entregues", "Pendentes"],
    datasets: [
      {
        data: [
          data.servicosEntreguesChart.entregues,
          data.servicosEntreguesChart.pendentes,
        ],
        backgroundColor: ["#0060fc", "#fa9200"],
      },
    ],
  };

  const chartKey = JSON.stringify(data);

  return (
    <div className="flex flex-col gap-10 p-8 w-full">
      <div className="flex justify-between items-center">
        <Title>Análise</Title>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Início</span>
            <DateInput selectedDate={startDate} onChange={setStartDate} className="w-40" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Fim</span>
            <DateInput selectedDate={endDate} onChange={setEndDate} className="w-40" />
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white/90 shadow-sm rounded-lg p-24 h-40 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm text-gray-500">Lucro Total</h3>
          <p className="text-xl font-bold text-indigo-600">
            R$ {data.lucroTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white/90 shadow-sm rounded-lg p-24 h-40 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm text-gray-500">Serviços Abertos</h3>
          <p className="text-xl font-bold text-green-600">
            {data.totalServicosAbertos}
          </p>
        </div>

        <div className="bg-white/90 shadow-sm rounded-lg p-24 h-40 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm text-gray-500">Serviços Entregues</h3>
          <p className="text-xl font-bold text-blue-600">
            {data.totalServicosEntregues}
          </p>
        </div>

        <div className="bg-white/90 shadow-sm rounded-lg p-24 h-40 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm text-gray-500 mb-2">Serviços Entregues</h3>
          <div className="w-32">
            <Pie key={`pie-${chartKey}`} data={entreguesData} options={{ plugins: { legend: { display: false } } }} />
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-2 gap-10">
        <div className="bg-white/90 p-6 rounded-xl shadow-md">
          <h3 className="mb-4 font-semibold text-gray-600">Lucro Mensal</h3>
          <Line key={`line-${chartKey}`} data={lucroData} />
        </div>

        <div className="bg-white/90 p-6 rounded-xl shadow-md">
          <h3 className="mb-4 font-semibold text-gray-600">Serviços Abertos</h3>
          <Bar key={`bar-${chartKey}`} data={servicosData} />
        </div>
      </div>
    </div>
  );
};

