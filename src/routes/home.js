import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  if (req.session.nombre) {
    res.render("index", { nombre: req.session.nombre });
  } else {
    res.redirect("/registro");
  }
});

export default router;
