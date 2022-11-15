import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  _id: String,
  materias_anual: Array,
  materias_bimestral: Array
});

export default mongoose.models.Users || mongoose.model("Users", usersSchema);
