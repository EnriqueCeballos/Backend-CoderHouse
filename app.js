const express = require("express");
const app = express();
const { Server: ioServer } = require("socket.io");
const http = "http";
const morgan = require("morgan");
const path = require("path");
const routesProductos = require("./routes/routesProductos");
const routesCarrito = require("./routes/routesCarrito");
const PORT = 8080;
const { options } = "./database/configDB";
const knex = "knex";

// SERVIDOR
const httpServer = http.createServer(app);
const io = new ioServer(httpServer);

//  MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.redirect("/api/productos");
});
app.use("/api/productos", routesProductos);
app.use("/api/carrito", routesCarrito);

// KNEX

try {
  knex(options).schema.dropTableIfExists("mensajes");
  knex(options).schema.createTable("mensajes", (table) => {
    table.increments("id").primary().unique();
    table.varchar("text", 60).notNullable();
    table.varchar("author", 45).notNullable();
  });
} catch (error) {
  throw error;
}

const mensajes = [
  {
    id: 1,
    text: "Bienvenido",
    author: "Enrique Ceballos",
  },
];
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado ", socket.id);

  socket.on("setName", (name) => {
    console.log(name);
    socket.emit("usuarioConectado", name);
    socket.broadcast.emit("usuarioConectado", name);
    socket.on("new-message", (data) => {
      io.sockets.emit("messages", mensajes);
    });
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
