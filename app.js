const express = require("express");
const app = express();
const { Server: ioServer } = require("socket.io");
const http = require("http");
const Container = require("./container");
const Messages = require("./messages");

const archivoNuevo = new Container();
const mensajesLlegados = new Messages("mensajes.txt");

const httpServer = http.createServer(app);
const io = new ioServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, resp) => {
  const productos = archivoNuevo.getAll();
  resp.render("index", { productos: productos });
});

app.post("/api/productos", (req, res) => {
  const producto = req.body;
  const productoAgregado = archivoNuevo.save(producto);
});

let mensajes = [];
const productos = [];

io.on("connection", (socket) => {
  console.log("cliente conectado");
  socket.on("newProduct", (data) => {
    productos.push(data);
    io.sockets.emit("productos", productos);
    console.log(productos);
  });
  io.sockets.emit("messages", mensajes);
  socket.on("newMessage", (message) => {
    mensajes.push(message);
    io.sockets.emit(`messages`, mensajes); //MENSAJE GLOBAL
    console.log(`Web socket en funcionamiento`, socket.id);
  });

  // ;socket.on("newMessage", async (mensaje) => {
  // await mensajesLlegados.save(mensaje);
  // mensajes = await mensajesLlegados.getAll();
  // io.sockets.emit("messages", mensajes);
});

const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));
