const fs = require("fs");

class contenedor {
  constructor(name) {
    this.fileName = name;
    this.countID = 0;
    this.content = [];
  }

  async write() {
    await fs.promises.writeFile(
      this.fileName,
      JSON.stringify(this.content, null, "")
    );
  }

  save(object) {
    this.countID++;
    object["id"] = this.countID;
    this.content.push(object);
    this.write();
    return `Se agrego el id: ${this.countID}`;
  }

  async getAll() {
    return this.content;
  }

  getById(id) {
    let resultado;
    if (this.content !== []) {
      resultado = this.content.find((x) => x.id === id);
      if (resultado === undefined) {
        resultado = null;
      }
    } else {
      resultado = "El archivo está vacío";
    }
    return resultado;
  }

  deleteById(id) {
    let resultado;
    if (this.content !== []) {
      let newContent = this.content.filter((x) => x.id !== id);
      this.content = newContent;
      this.write();
      resultado = "OK";
    } else {
      resultado = `El archivo está vacío`;
    }
    return resultado;
  }

  async deleteAll() {
    this.content = this.content.splice(0, this.content.length);
    this.write();
  }
}

module.exports = contenedor;
