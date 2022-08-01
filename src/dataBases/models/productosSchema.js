import mongoose from "mongoose";

const productosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
});

export const productosSchemaModel = mongoose.model(
  "Productos",
  productosSchema
);
