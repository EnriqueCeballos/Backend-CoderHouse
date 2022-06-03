const express = require("express");
const app = express();
const path = require("path");
const routesProductos = require("./routes/routesProductos");
const routesCarrito = require("./routes/routesCarrito");
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");

app.use("/productos", routesProductos);
app.use("/carrito", routesCarrito);

app.get("/", (req, res) => {
  res.redirect("/productos");
});

function onInit() {
  console.log("Iniciando App...");
}
try {
  PORT,
    () => {
      console.log(`Your app is listening on port ${PORT}`);
    };
} catch (error) {
  console.log("Error de conexión con el servidor...", error);
}

onInit();
