import MongoClass from "./MongoClass.js";
import { productosSchemaModel } from "../models/productosSchema.js";

export class MongoDBProductos extends MongoClass {
  constructor() {
    super("productos", productosSchemaModel)();
  }
}
