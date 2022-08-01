import { Router } from "express";
const router = Router();

router.get("/login", (req, res) => {
  res.render("errorRegistro", {
    title: "Error de registro",
  });
});

export default router;
