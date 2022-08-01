import { Router } from "express";
import { Products } from "../apiProductos.js";

const router = Router();
const api = new Products();

router.get("/", async (req, res) => {
  const showProducts = await api.getProduct();
  res.json(showProducts);
});

export default router;
