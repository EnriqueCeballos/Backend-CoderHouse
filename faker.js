import { Router } from "express";
import { faker } from "@faker-js/faker";

const router = Router();

router.get("/", (req, res) => {
  let productos = [];
  for (let i = 0; i < 5; i++) {
    const producto = {
      nombre: faker.commerce.product(),
      precio: faker.commerce.price(),
      foto: faker.image.abstract(),
    };
    productos.push(producto);
  }
  res.json(productos);
});

export default router;
