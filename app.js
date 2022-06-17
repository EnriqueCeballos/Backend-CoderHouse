const express = require("express");
const app = express();
const { Server: ioServer } = require("socket.io");
const http = "http";

const morgan = require("morgan");
const path = require("path");
const routesProductos = require("./public/routes/routesProductos");
const routesCarrito = require("./public/routes/routesCarrito");

const { db } = "./database/configDB";
const knex = "knex";
const contenedorProd = require("./containerProductsApi");

// const content = new contenedorProd(db.mariaDB, "productos");
// console.log(options.mariaDB);
// const chat = new contenedorProd(db.sqlite, "usuarios");

// SERVIDOR
const httpServer = http.createServer(app);
const io = new ioServer(http);

//  MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  let productos = content.getAll();
  if (productos != null) {
    res.render("index.ejs", { productos });
  } else {
    productos = [];
    res.render("index.ejs", { productos });
  }
  res.redirect("/api/productos");
});
app.use("/api/productos", routesProductos);
app.use("/api/carrito", routesCarrito);
// KNEX

try {
  knex(db).schema.dropTableIfExists("mensajes");
  knex(db).schema.createTable("mensajes", (table) => {
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

  const mensajes = chat.getAll();
  socket.emit("messages", mensajes);

  socket.on("newMessage", async (message) => {
    await chat.save(message);
    const mensajes = chat.getAll();
    io.sockets.emit("newMessages", mensajes);
  });
  socket.on("product", async (data) => {
    await content.save(data);
    const products = await content.getAll();
    io.sockets.emit("newProduct", products);
  });
});
const PORT = 8080;
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
