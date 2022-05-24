const express = require("express");
const app = express();
const routesNames = require(`./routes/routesNames`);
const path = require("path");
const fs = require(`fs`);
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/api/productos", routesNames);

app.get("/", (req, res) => {
  res.redirect("/api/productos");
});

// function mostrarProductos() {
//   const productos = [];
//   console("Iniciando aplicacion");
// }
// app.get(`/`, (req, res) => {
//   res.render(`index`, {
//     allProducts: mostrarProductos(),
//     listaProductos: true,
//   });
// });

const PORT = 8080;

try {
  app.listen(PORT);
  console.log(`Servidor escuchando el puerto ${PORT}`);
} catch (error) {
  console.log("Error al iniciar la aplicacion", error);
}
