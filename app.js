const express = require("express");
const app = express();
const routes = require(`./routes/routesNames`);
const multer = require("multer");
const handlebars = require("express-handlebars");
const ejs = require(`ejs`);
const fs = require(`fs`);

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

// HANDLEBARS
app.set(`views`, `./views`);
app.set(`view engine`, `hbs`);

app.engine(`hbs`, handlebars);
app.engine(
  `hbs`,
  handlebars({
    extname: ".hbs",
    defaultLayout: `index.hbs`,
    layoutsDir: __dirname + "/views/layout",
    partialsdIR: __dirname + "/views/partials",
  })
);

app.get(`/`, (req, res) => {
  res.render(`index`, { title: `Hello there` });
});

function mostrarProductos() {
  const productos = [];
}
app.get(`/`, (req, res) => {
  res.render(`main`, {
    allProducts: mostrarProductos(),
    listaProductos: true,
  });
});

// FIN DE HANDLEBARS
// EJS
app.set(`view engine`, `ejs`);

app.get(`/`, (req, res) => {
  res.render(`index.ejs`);
});
// FIN EJS

// PUG
app.set(`view engine`, `pug`);

// FIN PUG

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando el puerto ${PORT}`);
});
