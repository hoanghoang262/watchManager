import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  { brandName: String },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
