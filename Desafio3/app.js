const express = require("express");
const Contenedor = require("./contenedor");
const fs = require("fs");
const app = express();
const PORT = 8080;

const products = new Contenedor("./productos.txt");
products.init();

app.listen(process.env.PORT || PORT, () => {
  console.log("Servidor ejecutandose en el puerto 8080");
});
app.on("error", (error) => {
  console.log("Ha ocurrido un error");
});

const save = products.save({
  title: "Silla",
  price: 100,
  thumbail:
    "https://http2.mlstatic.com/D_NQ_NP_931157-MLA31308028051_072019-O.jpg",
  id: 6,
});
console.log(`Nuevo item con id ${save}`);

app.get("/", (request, response) => {
  response.send(`<h1 style='color:blue;'>Bienvenidos a Express</h1>`);
});

app.get("/productos", (req, res) => {
  try {
    const elementos = products.getAll();
    res.send(` Los elementos del archivo son ${JSON.stringify(elementos)}`);
  } catch (err) {
    res.send(`Ocurrio un error al obtener los elementos: ${err}`);
  }
});
app.get("/productoRandom", (req, res) => {
  const id = Math.floor(Math.random() * 4) + 1;
  try {
    const elementoRandom = products.getById(id);
    res.send(`El elemento con id ${id}, es ${JSON.stringify(elementoRandom)}`);
  } catch (err) {
    res.send(`Ocurrio un error al intentar obtener el elemento por id ${err}`);
  }
});
