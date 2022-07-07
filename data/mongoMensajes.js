import MongoClass from "./MongoClass.js";
import { schemaMensajes } from "../models/mensajesSchema.js";

export class MongoMensajes extends MongoClass {
  constructor() {
    super("mensajes", schemaMensajes);
  }
}
