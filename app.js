const express = require("express");
const app = express();
const routes = require(`./routes/routesNames`);
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/files");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

app.use(
  multer({
    storage,
  }).single("thumbnail")
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/", routes);
app.use("/api/productos", routes);
app.use("/api/productos/:id", routes);

app.get("/api", (req, res) => {
  return res.json();
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando el puerto ${PORT}`);
});
