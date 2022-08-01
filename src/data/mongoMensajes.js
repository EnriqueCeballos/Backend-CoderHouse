import MongoClass from "./MongoClass.js";
import { mensajesSchemaModel } from "../models/mensajesSchema.js";

export class MongoMensajes extends MongoClass {
  constructor() {
    super("mensajes", mensajesSchemaModel);
  }
}
