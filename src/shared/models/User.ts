import mongoose from "mongoose";

interface IUsers {
  _id: string;
  materias_anual: {
    nome: string;
    notas: {
      [index: number]: number;
    }
  }[];
  materias_bimestral: {
    nome: string;
    bimestre: number;
    notas: {
      nota: number;
      conceito: number;
    }
  }[];
};

const usersSchema = new mongoose.Schema<IUsers>({
  _id: String,
  materias_anual: Array,
  materias_bimestral: Array
});

export default mongoose.model<IUsers>("Users", usersSchema);
