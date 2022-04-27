const fs = require("fs");

class Contenedor {
  constructor(name) {
    this.fileName = name;
  }
  async save(objeto) {
    try {
      const contenido = await fs.promises(`./${this.fileName}`, `utf-8`);
      const arrayProducts = JSON.parse(contenido);
      let afterId = 0;
      if (arrayProducts.length === 0) {
        afterId = 1;
      } else {
        let lastId = 0;
        arrayProducts.array.forEach((element) => {
          lastId = element.id;
        });
        afterId = lastId + 1;
      }
      let objeto = {
        id: lastId,
        tittle: objeto.tittle,
        price: objeto.price,
        thumbnail: objeto.thumbnail,
      };
      arrayProducts.push(objeto);
      await fs.promises.writeFile(
        `./${this.fileName}`,
        `${JSON.stringify(arrayProducts)}`
      );
    } catch (err) {
      console.log("Save error", err);
    }
  }
  async getById(id) {
    try {
      const contenido = await fs.promises.readFile(
        `./${this.fileName}`,
        `utf-8`
      );
      const arrayProducts = JSON.parse(contenido);
      const foundProduct = arrayProducts.find((producto) => producto.id === id);
      if (foundProduct === undefined) {
        console.log(null);
      } else {
        console.log(foundProduct);
      }
    } catch (err) {
      console.log("getById error", err);
    }
  }
  async getAll() {
    try {
      const contenido = await fs.promises.readFile(
        `./${this.fileName}`,
        `utf-8`
      );
      const arrayProducts = JSON.parse(contenido);
      console.log(arrayProducts);
    } catch (err) {
      console.log("getAll errpr", err);
    }
  }
  async deletById(id) {
    try {
      const contenido = await fs.promises.readFile(
        `./${this.fileName}`,
        `utf-8`
      );
      const arrayProducts = JSON.parse(contenido);
      const foundProduct = arrayProducts.find((producto) => producto.id === id);
      if (foundProduct) {
        const minusArrayProducts = arrayProducts.filter(
          (producto) => producto.id !== id
        );
        await fs.promises.writeFile(
          `./${this.fileName}`,
          `${JSON.stringify(minusArrayProducts)}`
        );
        console.log(`Se elimino exitosamente el producto`);
      } else {
        console.log(`No hay producto para eliminar`);
      }
    } catch (err) {
      console.log("deleteById error", err);
    }
  }
  async deleteAll() {
    try {
      const deleteAllArray = [];
      await fs.promises.writeFile(
        `./${this.fileName}`,
        `${JSON.stringify(deleteAllArray)}`
      );
      console.log(`Todos los objetos se eliminaron exitosamente`);
    } catch (err) {
      console.log("deleteAll errpr", err);
    }
  }
}
module.exports = Contenedor;
