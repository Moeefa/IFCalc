import mongoose from "mongoose";

const adsSchema = mongoose.Schema({
  _id: String,
  image: String,
  title: String,
  desc: String,
  expire: Date
});

export default mongoose.models.Ads || mongoose.model("Ads", adsSchema);