import { Router } from "express";
const router = Router();

router.get("/login", (req, res) => {
  res.render("errorLogin", {
    title: "Error al Iniciar sesion",
  });
});

export default router;
