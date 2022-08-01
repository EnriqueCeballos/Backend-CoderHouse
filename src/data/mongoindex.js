import dotenv from "dotenv";
dotenv.config();
let productosData;
let mensajesData;

switch (process.env.DB_CONNECTION) {
  case "mongoDB":
    import("./mongoProductos.js").then(({ MongoProductos }) => {
      productosData = new MongoProductos();
    });
    import("./mongoMensajes.js").then(({ MongoMensajes }) => {
      mensajesData = new MongoMensajes();
    });
}

export { productosData, mensajesData };
