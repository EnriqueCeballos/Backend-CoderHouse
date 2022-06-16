const express = require("express");
const app = express();
const { Server: ioServer } = require("socket.io");
const http = "http";
const morgan = require("morgan");
const path = require("path");
const routesProductos = require("./routes/routesProductos");
const routesCarrito = require("./routes/routesCarrito");

const { options } = "./database/configDB";
const knex = "knex";
const content = new contenedorProd(options.mariaDB,'productos');
const chat = new contenedorChat(options.sqlite,'usuarios')

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
  let productos = await content.getAll();
    if (productos != null){
        res.render('index.ejs',{productos})
    } else {
        productos = [];
        res.render('index.ejs',{productos})
    }

});


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

  const mensajes = await chat.getAll();
  socket.emit('messages', mensajes)

  socket.on('newMessage', async(message)=>{
      await chat.save(message);
      const mensajes = await chat.getAll();
      io.sockets.emit('newMessages', mensajes)
  })
  socket.on('product', async(data)=>{
      await content.save(data);
      const products = await content.getAll();
      io.sockets.emit('newProduct', products)
  })
  
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
