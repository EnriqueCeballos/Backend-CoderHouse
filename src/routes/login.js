import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res) => {
  const { nombre } = req.body;
  console.log(nombre);
  req.session.nombre = nombre;
  const { email } = req.body;
  console.log(email);
  req.session.email = email;
  res.redirect("/");
});

export default router;
