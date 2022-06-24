const { db } = require("./database/configDB");
const knex = require("knex");

class contenedorProd {
  constructor(table) {
    this.db = db.mariaDB;
    this.table = table;
  }

  save(data) {
    try {
      const exist = this.knex.schema.hasTable(this.table);
      if (exist) {
        this.knex(this.table).insert(data);
        const res = JSON.stringify(
          this.knex.from(this.table).select("*").orderBy("id", "desc").limit(1)
        );
        const result = JSON.parse(res);
        return result;
      } else {
        this.knex.schema.createTable("productos", (table) => {
          table.increments("id").primary().unique();
          table.string("title", 50).notNullable();
          table.float("price").notNullable();
          table.string("image", 200).notNullable();
        });
        this.knex(this.table).insert(data);
        const res = JSON.stringify(
          this.knex.from(this.table).select("*").orderBy("id", "desc").limit(1)
        );
        const result = JSON.parse(res);
        return result;
      }
    } catch (error) {
      console.log("Hubo un error al guardar el articulo", error);
    }
  }
  getAll() {
    try {
      const exist = this.knex.schema.hasTable(this.table);
      if (exist) {
        const res = JSON.stringify(this.knex.from(this.table).select("*"));
        const result = JSON.parse(res);
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Hubo un error al mostrar la base de datos", error);
    }
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
      fs.writeFileSync(file.path[0], "utf8", json);
    } catch (err) {
      console.log("Error en la escritura", err);
    }
  }

  getById(id, file) {
    let mostrarArray = this.read(file);
    let producto = mostrarArray.find((producto) => producto.id == id);
    return producto ? producto : null;
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

module.exports = contenedorProd;
