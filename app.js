const express = require("express");
const app = express();
const { Server: ioServer } = require("socket.io");
const http = require("http");
const path = require("path");
const routesNames = require("./routes/routesNames");
const PORT = 8080;

const httpServer = http.createServer(app);
const io = new ioServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");

app.use("/api/productos", routesNames);

app.get("/", (req, res) => {
  res.redirect("/api/productos");
});

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado ", socket.id);

  socket.on("setName", (name) => {
    console.log(name);
    socket.emit("usuarioConectado", name);
    socket.broadcast.emit("usuarioConectado", name);
  });
  //   socket.on("newMessage", (message) => {
  //     mensajes.push(message);
  //     socket.emit(`messages`, message); //MENSAJE GLOBAL
  //     socket.broadcast.emit("messages", message);
  //   });

  //   socket.on("Desconectado", () => {
  //     console.log("Usuario desconectado");
  //   });
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
