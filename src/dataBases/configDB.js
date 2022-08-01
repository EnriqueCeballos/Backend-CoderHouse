import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default function connectedDB() {
  mongoose
    .connect(`mongodb://localhost:27017/ecommerce`)
    .then(() => console.log("Conectando a la base de datos de MongoDB..."))
    .catch((err) => console.log("Error de conexion", err));
}
