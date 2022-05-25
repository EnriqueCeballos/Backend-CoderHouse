const fs = require("fs");

class Container {
  constructor() {}

  save(productoo, file) {
    console.log("Guardando...", productoo);
    let nextId = this.getNextId(file);
    productoo.id = nextId;
    const mostrarArray = this.read(file);
    mostrarArray.push(productoo);
    this.write(mostrarArray, file);

    return `Se ha añadido el siguiente productoo: ${productoo}`;
  }

  update(id, productoo, file) {
    const mostrarArray = this.read(file);
    let index = mostrarArray.findIndex((productoo) => productoo.id == id);
    if (index >= 0) {
      mostrarArray[index] = productoo;
      this.write(mostrarArray, file);
      console.log("Actualizando productoos");
    } else {
      console.log("Producto no encontrado");
    }
  }

  getNextId(file) {
    let lastId = 0;
    let mostrarArray = this.read(file);
    if (mostrarArray.length > 0) {
      lastId = mostrarArray[mostrarArray.length - 1].id;
    }
    return lastId + 1;
  }
  read(file) {
    let mostrarArray = [];
    try {
      // if (!filepath || filepath[0] == "undefined") return;
      mostrarArray = this.read(file);
      mostrarArray.length > 0
        ? (mostrarArray = JSON.parse(mostrarArray))
        : (mostrarArray = []);
    } catch (err) {
      console.log("Error en la lectura del archivo", err);
    }
    return mostrarArray;
  }

  write(mostrarArray, file) {
    let json = JSON.stringify(mostrarArray);
    try {
      fs.writeFileSync(file, json);
    } catch (err) {
      console.log("Error en la escritura", err);
    }
  }

  getById(id, file) {
    let mostrarArray = this.read(file);
    let producto = mostrarArray.find((producto) => producto.id == id);
    return producto ? producto : null;
  }

  getAll(file) {
    let mostrarArray = this.read(file);
    return mostrarArray;
  }

  deleteById(id, file) {
    let mostrarArray = this.read(file);
    let index = mostrarArray.findIndex((producto) => producto.id == id);
    if (index >= 0) {
      mostrarArray.splice(index, 1);
      let json = JSON.stringify(mostrarArray);
      try {
        fs.writeFileSync(file, json);
        return id;
      } catch (err) {
        console.log("Error en la escritura", err);
      }
    }
  }
  deleteAll(file) {
    let mostrarArray = [];
    let json = JSON.stringify(mostrarArray);
    try {
      fs.writeFileSync(file, json);
    } catch (err) {
      console.log("Error en la escritura", err);
    }
  }
}

module.exports = Container;
