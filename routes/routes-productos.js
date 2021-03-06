import { Router } from "express";
import { productos } from "../servidor.js";
const router = Router();

class Container {
  constructor() {}
  productos = [];

  guardarProducto(nuevoProd, file) {
    let id = 0;
    if (this.productos.length === 0) {
      id = 1;
    } else {
      id = this.productos[this.productos.length - 1].id + 1;
    }

    let productoNuevo = {
      id: id,
      title: nuevoProd.title,
      price: nuevoProd.price,
      photo: file,
    };

    this.productos.push(productoNuevo);
  }

  devolverProducto() {
    return this.productos;
  }

  devolverProductoId(num) {
    const producto = this.productos.find((p) => p.id == Number(num));
    return producto;
  }

  actualizarProducto(id, product) {
    let index = this.productos.findIndex((p) => p.id == id);
    if (index >= 0) {
      this.productos[index] = product;
    } else {
      console.log("Producto no encontrado");
    }
  }

  deleteP(num) {
    this.productos = this.productos.filter((p) => p.id !== Number(num));
  }
}

const containerProductos = new Container();

router.get("/", (req, res) => {
  productos = containerProductos.devolverP();
  res.render("./partials/productos.ejs", {
    title: "Agregue un producto",
    products,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const producto = containerProductos.devolverPrId(id);
  producto
    ? res.json({ product })
    : res.json({ message: "Producto no encontrado. Id: " + id });
});

router.post("/", (req, res) => {
  let producto = req.body;
  const photo = req.file.filename;
  containerProductos.guardarP(producto, photo);
  res.json({ mensaje: "Producto agregado con éxito" });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const producto = containerProductos.devolverPrId(id);
  producto
    ? containerProductos.actualizarP(id, body)
    : res.json({ message: "Producto no encontrado" });
  res.json({ message: "Producto actualizado" });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  containerProductos.deleteP(id);
  res.json({ mensaje: "producto eliminado con éxito" });
});

export default router;
