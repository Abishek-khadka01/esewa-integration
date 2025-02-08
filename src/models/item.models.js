import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description : String,
  rating :{
    rate: Number,
    count : Number
  },
  image :{
    type : String,
  },
  category: { type: String },
}, { timestamps: true });

 export const Item = mongoose.model("Item", itemSchema);
