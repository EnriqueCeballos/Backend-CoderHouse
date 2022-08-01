import mongoose from "mongoose";

export const mensajesSchema = new mongoose.Schema({
  mail: {
    type: String,
    required: true,
  },
  texto: {
    type: String,
    required: true,
  },
  fecha: {
    type: String,
  },
});
export const mensajesSchemaModel = mongoose.model("mensajes", mensajesSchema);
