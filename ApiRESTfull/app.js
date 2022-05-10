const express = require("express");
const Contenedor = require("./contenedor/contenedor");
const { Router } = express;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando el puerto ${PORT}`);
});

const router = Router();
const productos = new Contenedor(__dirname + "/data/productos.json");

app.use("/api/productos", router);
app.use(express.static("./views"));

router.get("/", (req, res) => {
  return res.json(productos.content);
});

router.get("/api/productos/:id", (req, res) => {
  let id = Number(req.params.id);
  return res.json(productos.getById(id));
});

router.get("/api/productos/:id", (req, res) => {
  let id = Number(req.params);
  return res.json(productos.getById(id));
});

router.post("/api/productos", (req, res) => {
  let obj = req.body;
  return res.json(productos.save(obj));
});

router.put("/api/productos/:id", (req, res) => {
  let obj = req.body;
  let id = Number(req.params.id);
  return res.json(productos.update(id, obj));
});

router.delete("/api/productos/:id", (req, res) => {
  let id = Number(req.params.id);
  return res.json(productos.deleteById(id));
});
