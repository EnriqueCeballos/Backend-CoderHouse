const { db } = require("./configDB.js");
import knex from "knex";

try {
  knex(db.mariaDB).schema.dropTableIfExists("Productos");
  knex(db.mariaDB)
    .schema.createTable("Productos", (table) => {
      table.increments("id").primary().unique();
      table.varchar("title", 60).notNullable();
      table.float("price").notNullable();
      table.varchar("thumbnail", 120).notNullable();
      knex(db.mariaDB)("Productos").insert(nuevos);
    })
    .then(() => {
      console.log("Producto agregado con exito");
    });
} catch (error) {
  console.log(error);
}
