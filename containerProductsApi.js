const fs = require("fs");

class Container {
  constructor() {}

  save(producto, file) {
    console.log("Guardando...", producto);
    let nextId = this.getNextId(file);
    producto.id = nextId;
    const mostrarArray = this.read(file);
    mostrarArray.push(producto);
    this.write(mostrarArray, file);
  }

  update(id, producto, file) {
    const mostrarArray = this.read(file);
    let index = mostrarArray.findIndex((producto) => producto.id == id);
    if (index >= 0) {
      mostrarArray[index] = producto;
      this.write(mostrarArray, file);
      console.log("Actualizando productos");
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
      mostrarArray = fs.readFileSync(file, "utf8");
      //console.log('read mostrarArray', mostrarArray);
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
