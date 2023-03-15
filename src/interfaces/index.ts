/* useState hooks interfaces */
export interface IYear {
  nome: string;
  [bimestre: number]: number;
  avg: number;
}

export interface IBim {
  nome: string;
  bimestre: number;
  nota: number;
  conceito: number;
  avg: number;
}

export interface IOpenState {
  type: number;
  bimestre?: number;
  nome?: string;
}

/* Schemas interfaces */
export interface ISuap {
  materias_suap: {
    nome: string;
    notas: {
      [index: number]: number;
    };
  }[];
};
