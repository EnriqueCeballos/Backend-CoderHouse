const fs = require("fs");

class CarritoApiClass {
  constructor(dataBase) {
    this.dataBase = __dirname + dataBase;
  }
  async getAll() {
    try {
      const carritos = await fs.promises.readFile(this.dataBase, "utf-8");
      return JSON.parse(carritos);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async getById(id) {
    try {
      const carritos = await this.getAll();
      const resultado = carritos.get((e) => e.id == id);
      return resultado;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async create() {
    try {
      const carritos = await this.getAll();
      let id;
      let productos = {};
      let timestamp = Date.now();
      carritos.length === 0
        ? (id = 1)
        : (id = carritos[carritos.length - 1].id + 1);
      carritos.push({ id, productos, timestamp });
      await fs.promises.writeFile(this.dataBase, JSON.stringify(carritos));
      return id;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async createCarritoProds(id, producto) {
    try {
      const carritos = await this.getAll();
      const carrito = await this.getById(id);
      const carritoProd = Object.assign(carrito.productos, producto);
      carrito.productos = carritoProd;
      carritos.map((e) => {
        if (e.id == Number(id)) {
          e.productos = carrito.productos;
        }
      });
      await fs.promises.writeFile(this.dataBase, JSON.stringify(carritos));
      return producto;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async deleteCarrito(id) {
    try {
      const carritos = await this.getAll();
      const carritosNew = carritos.filter((p) => p.id !== Number(id));
      await fs.promises.writeFile(this.dataBase, JSON.stringify(carritosNew));
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async deleteProduct(id, idProducto) {
    try {
      const carrito = await this.getById(id);
      const productos = carrito[1].filter((p) => p.id !== Number(idProducto));
      await fs.promises.writeFile(this.dataBase, JSON.stringify(productos));
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}
module.exports = CarritoApiClass;
