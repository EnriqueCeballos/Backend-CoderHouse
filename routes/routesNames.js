const { Router } = require(`express`);
const router = Router();
const productos = [];

function save(object) {
  this.countID++;
  object["id"] = this.countID;
  this.productos.push(object);
  return `El id del objeto añadido es ${this.countID}`;
}

function getById(id) {
  let result;
  if (this.productos !== []) {
    result = this.productos.find((x) => x.id === id);
    if (result === undefined) {
      result = null;
    }
  } else {
    result = "Producto no encontrado";
  }
  return result;
}

function deleteById(id) {
  let result;
  if (this.productos !== []) {
    let newProducto = this.producto.filter((x) => x.id !== id);
    this.productos = newProducto;
    result = "OK";
  } else {
    result = `Producto no encontrado`;
  }
  return result;
}

function update(id, obj) {
  const index = this.producto.findIndex((obj) => obj.id == id);
  obj.id = this[index].id;
  this.producto[index] = obj;
  return obj;
}

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

router.get("/", (req, res) => {
  return res.json({ productos: productos });
});

router.get("/api/productos/:id", (req, res) => {
  let id = Number(req.params);
  return res.json(productos.getById(id));
});

router.post(
  "/api/productos",
  errorMiddleware,
  verificarProducto,
  (req, res) => {
    const producto = req.body;
    productos.push(producto);
    res.json("PRODUCTO AGREGADO CON EXITO");
  }
);

router.put("/api/productos/:id", (req, res) => {
  let obj = req.body;
  let id = Number(req.params.id);
  return res.json(productos.update(id, obj));
});

router.delete("/api/productos/:id", (req, res) => {
  let id = Number(req.params.id);
  return res.json(productos.deleteById(id));
});

module.exports = router;
