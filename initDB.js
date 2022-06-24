import { options } from "./config/configDB.js";
import knex from "knex";

const productos = require("./data/productos.json")(async () => {
  const db = knex(options.mysql);
  try {
    await db.schema.createTableIfNotExists("products", (table) => {
      table.increments("id").primary();
      table.string("name");
      table.string("description");
      table.integer("price");
      table.integer("stock");
      table.string("thumbnail");
      table.string("code");
    });

    await db("products").insert(productos);
    console.log("Datos insertados");
  } catch (err) {
    console.log(err);
  }
})();
