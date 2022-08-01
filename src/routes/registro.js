import { Router } from "express";
import passport from "passport";
const router = Router();

router.get("/", (req, res) => {
  res.render("registro", {
    title: "Registro",
  });
});

router.post(
  "/",
  passport.authenticate("signUp", {
    failureRedirect: "/errorRegistro",
    successRedirect: "/login",
  })
);

export default router;
