import mongoose from "mongoose";
import { productosModel } from "./models/productosSchema";

async function bddMongoose() {
  try {
    // CONEXION A LA BASE DE DATOS
    const URL =
      "mongodb+srv://coderhouse:coderhouse@cluster0.dm2cck7.mongodb.net/?retryWrites=true&w=majority";
    mongoose
      .connect(URL, {
        userNewUrlParse: true,
        UseUnifiedTopology: true,
      })
      .then(() => {
        console.log("Conectado con Atlas");
      })
      .catch((err) => {
        console.log(err);
      });

    mongoose.connection.on("open", () => {
      console.log("Base de datos conectada");
    });
    const primerProducto = {
      nombre: "Computadora",
      precio: 230,
      description: "Ultima generacion",
      thumbnail: "http/fsafasa",
      stock: 20,
    };

    const modelo = new productosModel(primerProducto);
    await modelo.save();
  } catch (error) {
    console.log(error);
  }
  const productoSegundo = await productosModel.find({}, { nombre: 1, _id: 0 });
  console.log(productoSegundo);
}

bddMongoose();
