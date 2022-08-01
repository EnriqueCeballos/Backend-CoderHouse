import passport from "passport";
import { Strategy } from "passport-local";
import Usuarios from "../dataBases/models/usuarios.js";

const localStrategy = Strategy;

passport.use(
  "signUp",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const usuario = await Usuarios.findOne({ email });
      if (usuario) {
        return done(null, false);
      }
      const user = new Usuarios();
      const { nombre } = req.body;
      user.nombre = nombre;
      user.email = email;
      user.password = user.encrypta(password);

      await user.save();
      return done(null, user);
    }
  )
);
