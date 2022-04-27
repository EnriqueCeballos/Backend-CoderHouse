const fs = require("fs");

class Contenedor {
  constructor(name) {
    this.file = name;
    this.countID = 0;
    this.contenido = [];
  }

  async write() {
    await fs.promises.writeFile(
      this.file,
      JSON.stringify(this.contenido, null, "")
    );
  }

  save(object) {
    this.countID++;
    object["id"] = this.countID;
    this.contenido.push(object);
    this.write();
    return `El id del objeto añadido es ${this.countID}`;
  }

  async getAll() {
    return this.contenido;
  }

  getById(id) {
    let result;
    if (this.contenido !== []) {
      result = this.contenido.find((x) => x.id === id);
      if (result === undefined) {
        result = null;
      }
    } else {
      result = "No hay datos en este archivo";
    }
    return result;
  }

  deleteById(id) {
    let result;
    if (this.contenido !== []) {
      let newContenido = this.contenido.filter((x) => x.id !== id);
      this.contenido = newContenido;
      this.write();
      result = "OK";
    } else {
      result = `No hay datos en este archivo`;
    }
    return result;
  }

  async deleteAll() {
    this.contenido = this.contenido.splice(0, this.contenido.length);
    this.write();
  }
}

module.exports = Contenedor;
