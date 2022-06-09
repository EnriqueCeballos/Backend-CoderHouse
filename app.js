const express = require("express");
const app = express();
const { Server: ioServer } = require("socket.io");
const morgan = require("morgan");
const path = require("path");
const routesProductos = require("./routes/routesProductos");
const routesCarrito = require("./routes/routesCarrito");
const PORT = 8080;
const http = require("http");

// SERVIDOR
const httpServer = http.createServer(app);
const io = new ioServer(httpServer);

// SETTINGS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));

app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");

// ROUTES
app.get("/", (req, res) => {
  res.redirect("/api/productos");
});
app.use("/api/productos", routesProductos);
app.use("/api/carrito", routesCarrito);

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado ", socket.id);

  socket.on("setName", (name) => {
    console.log(name);
    socket.emit("usuarioConectado", name);
    socket.broadcast.emit("usuarioConectado", name);
  });
});

function onInit() {
  console.log("Iniciando App...");
}
try {
  httpServer.listen(PORT, () => {
    console.log(`Your app is listening on port ${PORT}`);
  });
} catch (error) {
  console.log("Error de conexión con el servidor...", error);
}

onInit();
