import mongoose from "mongoose";

interface IUser {
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

const usersSchema = new mongoose.Schema<IUser>({
  _id: String,
  materias_anual: Array,
  materias_bimestral: Array
});

export default mongoose.models.Users || mongoose.model("Users", usersSchema);
