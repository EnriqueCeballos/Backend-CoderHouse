import express from "express";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import http from "http";
const app = express();
import multer from "multer";
import routesProductos from "./routes/routes-productos.js";
import routesMensajes from "./routes/routes-mensajes.js";

const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(
  multer({
    dest: __dirname + "/public/files",
  }).single("photo")
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
// app.use("/api/productos-test");
app.use("/productos", routesProductos);
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Agregando producto",
  });
});

export const productos = [];

export const mensajes = [];

io.on("connection", (socket) => {
  console.log("nuevo cliente conectado", socket.id);
  socket.emit("productos", productos);
  socket.emit("mensajes", mensajes);

  socket.on("newProducto", (producto) => {
    productos.push(producto);
    io.sockets.emit("productos", productos);
  });

  socket.on("newMessage", (mensaje) => {
    mensajes.push(mensaje);
    io.sockets.emit("mensajes", mensajes);
  });
});

const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`servidor escuchando en el puerto ${PORT}`);
});
