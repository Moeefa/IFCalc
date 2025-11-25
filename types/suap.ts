export type Results<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type Material = {
  id: number;
  data: string;
  descricao: string;
  url: string;
  diario: Diary;
};

export type User = {
  id: number;
  matricula: string;
  nome_usual: string;
  cpf: string;
  rg: string;
  filiacao: string[];
  data_nascimento: string;
  naturalidade: string;
  tipo_sanguineo: string;
  email: string;
  url_foto_75x100: string;
  url_foto_150x200: string;
  tipo_vinculo: string;
  vinculo: {
    matricula: string;
    nome: string;
    curso: string;
    campus: string;
    situacao: string;
    cota_sistec: string;
    cota_mec: string;
    situacao_sistemica: string;
    matricula_regular: boolean;
    linha_pesquisa: string | null;
    curriculo_lattes: string;
  };
};

export type Message = {
  id: number;
  status: string;
  remetente: {
    id: number;
    nome: string;
    email: string;
  };
  destinatarios: any[]; // Assuming destinatarios is an array of objects, but not defined in the mock data
  assunto: string;
  conteudo: string;
  data_envio: string; // Formatted as "DD/MM/YYYY HH:mm:ss"
  registro_leitura: boolean;
  registro_exclusao: boolean;
};

export type Subject = {
  id: number;
  descricao: string;
  sigla: string;
  situacao: { rotulo: string; status: string } | null;
  ch_total_aula: number;
  ch_total_relogio: number;
  ch_cumprida_aula: number;
  qtd_faltas: number;
  qtd_avaliacoes: number;
  frequencia: number;
  notas: {
    tipo: string;
    nota: string | null;
  }[];
  medias: {
    tipo: string;
    nota: string | null;
  }[];
  diary: Diary;
};

export type SubjectDetails = {
  numero_etapa: number;
  avaliacoes: {
    tipo: string;
    sigla: string;
    forma_calculo: string;
    data: string;
    nota: string | null;
  }[];
};

export type Period = {
  id: number;
  semestre: string;
};

export type Homework = {
  id: number;
  titulo: string;
  data_solicitacao: string;
  data_limite: string;
  etapa: string;
  expirado: boolean;
  diario: Diary;
};

export type Diary = {
  id: number;
  disciplina: Subject;
  professores:
    | {
        id: number;
        nome: string;
        email: string;
      }[]
    | null;
  horarios:
    | {
        dia: string;
        horario: string;
      }[]
    | null;
  local: {
    id: number;
    sala: string;
  } | null;
  ambiente_virtual: string;
};
