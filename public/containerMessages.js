// const knex = require("knex");
const { db } = require("../database/configDB");

class contenedorChat {
  constructor(table) {
    this.knex = require("knex");
    this.db = db.mariaDB;
    this.table = table;
  }
  async save(newData) {
    try {
      const exist = await this.knex.schema.hasTable(this.table);
      if (exist) {
        await this.knex(this.table).insert(newData);
        const res = JSON.stringify(
          await this.knex
            .from(this.table)
            .select("*")
            .orderBy("id", "desc")
            .limit(1)
        );
        const result = JSON.parse(res);
        return result;
      } else {
        await this.knex.schema.createTable("usuarios", (table) => {
          table.increments("id").primary().unique();
          table.string("autor", 50).notNullable();
          table.string("hora").notNullable();
          table.string("texto", 300).notNullable();
        });
        await this.knex(this.table).insert(newData);
        const res = JSON.stringify(
          await this.knex
            .from(this.table)
            .select("*")
            .orderBy("id", "desc")
            .limit(1)
        );
        const result = JSON.parse(res);
        return result;
      }
    } catch (error) {
      console.log("Error al guardar el articulo", error);
    }
  }
  async getAllMessages() {
    try {
      const exist = await this.knex.schema.hasTable(this.table);

      if (exist) {
        const res = JSON.stringify(
          await this.knex.from(this.table).select("*")
        );
        const result = JSON.parse(res);
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error al mostrar la base de datos", error);
    }
  }
}
module.exports = contenedorChat;
