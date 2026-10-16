
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  productName: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  purchasePrice: { type: Number, required: true, min: 0 },
  warrantyMonths: { type: Number, required: true, min: 0 },
  serialNumber: { type: String, default: "" }
});

export default mongoose.model("Product", schema);
