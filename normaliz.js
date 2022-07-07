import { normalize, denormalize, schema } from "normalizr";
import { inspect } from "util";
import { mensajes } from "./servidor";

const { author } = mensajes;

const authorSchema = new schema.Entity("author");

const mensajesSchema = new schema.Entity("mensajes", {
  author: authorSchema,
});

const mensajesNormalized = normalize(mensajes, mensajesSchema);

console.log("Data inicial", JSON.stringify(mensajes));
console.log("Data normalizada", JSON.stringify(mensajesNormalized));

function print(objeto) {
  console.log(inspect(objeto, false, 10, true));
}

print(mensajesNormalized);

const mensajesDenormalized = denormalize(
  mensajesNormalized.result,
  mensajesSchema,
  mensajesNormalized.entities
);
console.log("Data desnormalizada", JSON.stringify(mensajesDenormalized));
print(mensajesDenormalized);
