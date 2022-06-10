import { options } from "./configDB.js";
import knex from "knex";

try {
  knex(options).schema.dropTableIfExists("Productos");
  knex(options)
    .schema.createTable("Productos", (table) => {
      table.increments("id").primary().unique();
      table.varchar("title", 60).notNullable();
      table.float("price").notNullable();
      table.varchar("thumbnail", 120).notNullable();
      knex(options)("Productos").insert(nuevos);
    })
    .then(() => {
      console.log("Producto agregado con exito");
    });
} catch (error) {
  console.log(error);
}
