export interface AnaliseDTO {
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
