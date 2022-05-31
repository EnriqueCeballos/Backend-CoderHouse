const { Router } = require(`express`);
const router = Router();
const Container = require("../container");
const file = "./productos.json";
const containerProducts = new Container();
const multer = require("multer");
const myScript = "public/main.js";
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
router.use(multer({ storage }).single("photo"));
router.get("/", (req, res) => {
  const productos = containerProducts.getAll(file);
  res.render(`index.ejs`, { productos, myScript });
});

router.post("/", (req, res) => {
  console.log("req.body", req.body);
  const body = req.body;
  const photo = req.file;
  console.log(photo);
  body.photo = "/public/uploads/" + photo;
  containerProducts.save(body, file);
  res.redirect("/api/productos");
});
// const verificarProducto = function (req, res, next) {
//   const error = "Producto no encontrado";
//   if (req.body.id > 0) {
//     next(error);
//   }
//   next();
// };

// const errorMiddleware = function (err, req, res, next) {
//   if (err) {
//     return res.status(500).json({ error: err });
//   }
//   next();
// };

// router.post("/productos", errorMiddleware, verificarProducto, (req, res) => {
//   const producto = req.body;
//   if (producto.length > 0) {
//     productos.push(producto);
//     res.redirect("/productos");
//   }
// });

// router.put("/productos/:id", (req, res) => {
//   let obj = req.body;
//   let id = Number(req.params.id);
//   return res.json(productos.update(id, obj));
// });

// router.delete("/api/productos/:id", (req, res) => {
//   let id = Number(req.params.id);
//   return res.json(productos.deleteById(id));
// });

module.exports = router;
