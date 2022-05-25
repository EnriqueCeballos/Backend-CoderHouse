const { Router } = require(`express`);
const router = Router();
const Container = require("../container");
const containerProducts = new Container();
const multer = require("multer");
const file = "./productos.json";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/files");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
router.use(multer({ storage }).single("thumbnail"));

router.get("/", (req, res) => {
  const productos = containerProducts.getAll(file);
  res.render(`index.ejs`, { productos });
});

router.post("/", (req, res) => {
  console.log("req.body", req.body);
  const body = req.body;
  const photo = req.file;
  console.log(photo);
  body.thumbnail = "/public/img/" + req.file;
  containerProducts.save(body, file);
  res.redirect("/api/productos");
});
const verificarProducto = function (req, res, next) {
  const error = "Producto no encontrado";
  if (req.body.id > 0) {
    next(error);
  }
  next();
};

const errorMiddleware = function (err, req, res, next) {
  if (err) {
    return res.status(500).json({ error: err });
  }
  next();
};

router.post("/productos", errorMiddleware, verificarProducto, (req, res) => {
  const producto = req.body;
  if (producto.length > 0) {
    productos.push(producto);
    res.redirect("/productos");
  }
});

router.put("/productos/:id", (req, res) => {
  let obj = req.body;
  let id = Number(req.params.id);
  return res.json(productos.update(id, obj));
});

router.delete("/api/productos/:id", (req, res) => {
  let id = Number(req.params.id);
  return res.json(productos.deleteById(id));
});

module.exports = router;
