import { Router } from "express";
import { useEffect, useState } from "react";

const router = Router();
let productos = [
  {
    _id: {
      $oid: "62bda945671d66c98470bead",
    },
    name: "Campera",
    description: "Talle 2",
    code: "2314",
    thumbanil: "http/rfafasf",
    price: "1200",
    stock: "24",
  },
  {
    _id: {
      $oid: "62bda945671d66c98470beae",
    },
    name: "Televisor",
    description: "42 pulgadas",
    code: "4214",
    thumbnail: "http/reqrwq",
    price: "5000",
    stock: "10",
  },
  {
    _id: {
      $oid: "62bda945671d66c98470beaf",
    },
    name: "telefono",
    description: "samsung s22",
    code: " 1244214",
    thumbnail: "http/hghdf",
    price: "4800",
    stock: "5",
  },
  {
    _id: {
      $oid: "62bda945671d66c98470beb0",
    },
    name: "calefactor",
    description: "Tiro balanceado",
    code: "3536",
    thumbnail: "http/fsafa",
    price: "320",
    stock: "42",
  },
  {
    _id: {
      $oid: "62bdab7d671d66c98470beb1",
    },
    name: "Heladera",
    description: "210 lts",
    code: "32142",
    thumbanil: "http/rfafasf",
    price: "4000",
    stock: "14",
  },
  {
    _id: {
      $oid: "62bdab7d671d66c98470beb2",
    },
    name: "Sommier",
    description: "2 plazas",
    code: "3124",
    thumbnail: "http/reqrwq",
    price: "3210",
    stock: "10",
  },
  {
    _id: {
      $oid: "62bdab7d671d66c98470beb3",
    },
    name: "Escritorio",
    description: "70x60x80",
    code: " 1764",
    thumbnail: "http/hghdf",
    price: "3214",
    stock: "5",
  },
  {
    _id: {
      $oid: "62bdab7d671d66c98470beb4",
    },
    name: "Ventilador",
    description: "4 velocidades",
    code: "3214",
    thumbnail: "http/fsafa",
    price: "210",
    stock: "42",
  },
  {
    _id: {
      $oid: "62bdac26671d66c98470beb5",
    },
    name: "Teclado",
    description: "Mecanico RGB",
    code: "2313214",
    thumbanil: "http/rfafasf",
    price: "3400",
    stock: "26",
  },
  {
    _id: {
      $oid: "62bdac26671d66c98470beb6",
    },
    name: "Monitor",
    description: "24 pulgadas",
    code: "79689",
    thumbnail: "http/reqrwq",
    price: "2130",
    stock: "10",
  },
  {
    _id: {
      $oid: "62bdad2c671d66c98470beb7",
    },
    name: "Pantalon",
    description: "Talle 42",
    code: "6534",
    thumbnail: "http/momgfsdoif",
    price: "965",
    stock: "16",
  },
];

export class Container {
  constructor() {}
  productos = this.productos;

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
      thumbnail: file.thumbnail,
    };

    this.productos.push(productoNuevo);
  }

  devolverProducto(item) {
    const itemCard = document.getElementById("productsCard");
    if (
      productos.length > 0
        ? productos.map(() => {
            itemCard.innerHTML += `<table>
    
    <tr class="filas">
      <th class="columnas">${id}</th>
      <th class="columnas">${this.title}</th>
      <th class="columnas">${this.price}</th>
      <th class="columnas">${this.thumbnail}</th>
    </tr>
  </table>`;
          })
        : (itemCard.innerHTML += `<div className="errorPage">
      <div className="containerError">
        <h2>Generando los archivos necesarios!</h2>
        <p>Si el problema persiste recarge la pagina</p>`)
    );
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

  deleteProducto(num) {
    this.productos = this.productos.filter((p) => p.id !== Number(num));
  }
}

const containerProductos = new Container();

router.get("/", (req, res) => {
  productos = containerProductos.devolverProducto();
  res.render("./partials/productos", {
    title: "Agregue un producto",
    productos,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const producto = containerProductos.devolverPrId(id);
  producto
    ? res.json({ producto })
    : res.json({ message: "Producto no encontrado. Id: " + id });
});

router.post("/home", (req, res) => {
  let producto = req.body;
  const photo = req.file.filename;
  containerProductos.guardarProducto(producto, photo);
  res.json({ mensaje: "Producto agregado con éxito" });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const producto = containerProductos.devolverPrId(id);
  producto
    ? containerProductos.actualizarProducto(id, body)
    : res.json({ message: "Producto no encontrado" });
  res.json({ message: "Producto actualizado" });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  containerProductos.deleteProducto(id);
  res.json({ mensaje: "producto eliminado con éxito" });
});

export default router;
// import { Router } from "express";
// import Productos from "../data/productos.json";

// const router = Router();
// const api = new Productos();

// router.get("/", async (req, res) => {
//   const showProductos = await api.getProducto();
//   res.json(showProductos);
// });

// export default router;
