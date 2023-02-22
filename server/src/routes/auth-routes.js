import { Router } from "express";
import bcrypt from "bcrypt";

import { db } from "../index.js";
import { userSchema } from "../validators/auth.js";

const authRouter = Router();
const saltRounds = 10;

authRouter.post("/sign-up", async (req, res) => {
  const name = req.body.username;
  const password = req.body.password;
  const user = await db.oneOrNone(
    "SELECT user_id FROM users WHERE username = $1",
    [name]
  );
  const validation = userSchema.validate(req.body);
  if (validation || user) {
    res.status(400).json({ message: validation || "User already exists" });
  } else {
    try {
      bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
        if (!err) {
          await db.none("INSERT INTO users(username,password) VALUES($1,$2)", [
            name,
            hashedPassword,
          ]);
          res.status(200).redirect("/sign-in");
        }
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
});

authRouter.post("/sign-in", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const message = "Invalid username or password";
  const user = await db.oneOrNone(
    "SELECT username,password,user_id FROM users WHERE username = $1",
    [username]
  );
  const validation = userSchema.validate(req.body);
  if (!user) {
    res.status(400).json(message);
  } else {
    bcrypt.compare(password, user.password, (err, success) => {
      if (!validation && success) {
        req.session ? (req.session.user = user) : null;
        console.log("req.session: ", req.session);
        res.status(200);
      } else {
        res.status(400).json(message);
      }
    });
  }
});

authRouter.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    err ? next(err) : res.redirect("/sign-in");
  });
});

export default authRouter;
