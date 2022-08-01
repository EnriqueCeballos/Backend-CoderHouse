import express from "express";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import MongoStore from "connect-mongo";
import "dotenv/config";
import http from "http";
import multer from "multer";
import routesProductos from "./routes/productos.js";
import passport from "passport";
import homeRouter from "./routes/home.js";
import loginRouter from "./routes/login.js";
import logoutRouter from "./routes/logout.js";
import routeRegistro from "./routes/registro.js";
import errorLogin from "./routes/errorLogin.js";
import errorRegistro from "./routes/errorRegistro.js";
import connectedDB from "./dataBases/configDB.js";
import dotenv from "dotenv";
import Products from "./apiProductos.js";
import "./passport/local.js";
import indexRoutes from "./routes/indexRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const DB_NAME = process.env.DB_NAME;
const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true };

connectedDB();

app.use(
  multer({
    dest: __dirname + "/public/files",
  }).single("photo")
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: "logeo",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://coderhouse:coderhouse@cluster0.dm2cck7.mongodb.net/?retryWrites=true&w=majority`,
      mongoOptions: advanceOptions,
      ttl: 600,
    }),
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 600000,
    },
  })
);

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/", homeRouter);
app.use("/productos", routesProductos);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/registro", routeRegistro);
app.use("/errorLogin", errorLogin);
app.use("/errorRegistro", errorRegistro);
app.use("/process", indexRoutes);

app.use(passport.initialize()); //iniciar passport y sesion passport
app.use(passport.session());

const product = new Products();
io.on("connection", async (socket) => {
  console.log("cliente conectado", socket.id);
  try {
    let data = await product.getProduct();
    const getMessages = await author.find({});
    io.sockets.emit("resultData", data);
    io.sockets.emit("messages", getMessages);
  } catch (error) {
    console.log(error);
  }

  socket.on("newMessage", async (data) => {
    try {
      const newMessage = new author(data);
      await newMessage.save();
      io.sockets.emit("addMessage", newMessage);
    } catch (error) {
      console.log(error);
    }
  });
});
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`servidor escuchando en el puerto ${PORT}`);
});
