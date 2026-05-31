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
import DateInput from "@/shared/components/ui/Inputs/DateInput";
import { subYears } from "date-fns";
import Spinner from "@/shared/components/ui/Spinner";
import type { AnaliseDTO } from "@/features/admin/dtos/AnaliseDTO";
import { consultarAnalise } from "@/features/admin/api/analise.api.ts";
import { useModal } from "@/shared/contexts/modal.context";

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

export const Analise = () => {
  const [data, setData] = useState<AnaliseDTO | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(subYears(new Date(), 1));
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(true);
  const {showError} = useModal();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await consultarAnalise(
          startDate?.toISOString(),
          endDate?.toISOString(),
        );
        console.log("Dados da análise recebidos:", result);
        setData(result);
      } catch (error) {
        console.error("Erro ao buscar dados de análise:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  if (loading || !data) {
    return <Spinner />;
  }

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

  const usuariosData = {
    labels: data.meses,
    datasets: [
      {
        label: "Usuários Cadastrados",
        data: data.usuariosCadastradosMensal,
        backgroundColor: "#6366f1",
      },
    ],
  };

  const entreguesData = {
    labels: ["Entregues", "Abertos"],
    datasets: [
      {
        data: [
          data.totalServicosEntregues,
          data.totalServicosAbertos,
        ],
        backgroundColor: ["#6366f1", "#08a000"],
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

              <DateInput
              selectedDate={startDate}
              onChange={(date) => {
                if (!date) {
                  setStartDate(null);
                  return;
                }

                if (date > new Date()) {
                  showError({ content: "A data de início não pode estar no futuro." });
                  return;
                }

                if (endDate && date > endDate) {
                  showError({ content: "A data de início não pode ser posterior à data de fim." });
                  return;
                }

                setStartDate(date);
              }}
              className="w-40"
            />

          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Fim</span>

              <DateInput
                selectedDate={endDate}
                onChange={(date) => {
                  if (!date) {
                    setEndDate(null);
                    return;
                  }

                  if (startDate && date < startDate) {
                    showError({ content: "A data de fim não pode ser anterior à data de início." });
                    return;
                  }

                  if (date > new Date()) {
                    showError({ content: "A data de fim não pode estar no futuro." });
                    return;
                  }

                  setEndDate(date);
                }}
                className="w-40"
              />

          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="bg-white/90 shadow-sm rounded-lg p-12 h-32 flex flex-col items-center justify-center text-center border-l-4 border-indigo-600">
          <h3 className="text-sm text-gray-500 uppercase tracking-wider">Lucro Total no Período</h3>
          <p className="text-3xl font-bold text-indigo-600">
            R$ {data.lucroTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10">
        <div className="bg-white/90 p-6 rounded-xl shadow-md">
          <h3 className="mb-4 font-semibold text-gray-600">Lucro Mensal</h3>
          <Line key={`line-${chartKey}`} data={lucroData} />
        </div>

        <div className="bg-white/90 p-6 rounded-xl shadow-md">
          <h3 className="mb-4 font-semibold text-gray-600">Serviços Abertos Mensal</h3>
          <Bar key={`bar-servicos-${chartKey}`} data={servicosData} />
        </div>

        <div className="bg-white/90 p-6 rounded-xl shadow-md">
          <h3 className="mb-4 font-semibold text-gray-600">Usuários Cadastrados Mensal</h3>
          <Bar key={`bar-usuarios-${chartKey}`} data={usuariosData} />
        </div>

        <div className="bg-white/90 p-6 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="mb-4 font-semibold text-gray-600 text-left w-full">Status dos Serviços (Abertos vs Entregues)</h3>
          <div className="w-full max-w-md mx-auto">
            <Pie key={`pie-${chartKey}`} data={entreguesData} options={{ plugins: { legend: { position: 'bottom' } } }} />
          </div>
        </div>
      </div>
    </div>
  );
};
