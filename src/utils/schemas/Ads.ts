import mongoose from "mongoose";

interface IAds {
  _id: string;
  image: string;
  title: string;
  desc: string;
  expire: Date;
}

const adsSchema = new mongoose.Schema<IAds>({
  _id: String,
  image: String,
  title: String,
  desc: String,
  expire: Date
});

export default mongoose.model<IAds>("Ads", adsSchema);