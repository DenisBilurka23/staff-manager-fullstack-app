import { Router } from "express";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

import { userSchema } from "../validators/auth.js";
import models from "../../models/index.js";
import {
  createTokens,
  findToken,
  updateToken,
  verifyToken,
} from "../utils/auth-helpers.js";
import { userDto } from "../utils/user-dto.js";
import { parseErrors } from "../utils/error-parser.js";

const authRouter = Router();
const loadedModels = await models;
const saltRounds = 10;
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  secure: false,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

authRouter.post("/sign-up", async (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  const user = await loadedModels.User.findOne({
    where: { email },
  });
  const validation = userSchema.validate(req.body);
  if (validation?.length || user) {
    res.status(400).json(parseErrors(validation) || "User already exists");
  } else {
    try {
      bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
        if (!err) {
          const user = loadedModels.User.build({
            email,
            password: hashedPassword,
            isActivated: false,
          });
          await user.save();
          const tokens = createTokens(userDto(user));
          await updateToken(user.id, tokens.refreshToken);
          transporter.sendMail({
            from: "vadya555555@gmail.com",
            to: user.email,
            subject: "Account activation for Staff Management",
            text: "",
            html: `
              <h1>
                Account activation
              </h1>
              <div>
                To continue follow link below:
                <a href='${process.env.BASE_URL}/activate/${user.id}'>activate</a>
              </div>
            `,
          });
          res
            .cookie("refreshToken", tokens.refreshToken, {
              httpOnly: true,
              maxAge: 30 * 24 * 60 * 60 * 1000,
            })
            .json({ ...tokens, ...userDto(user) });
        }
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
});

authRouter.post("/sign-in", async (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  const message = "Invalid email or password";
  const user = await loadedModels.User.findOne({
    where: { email },
  });
  const validation = userSchema.validate(req.body);
  if (validation?.length || !user) {
    res.status(400).json(parseErrors(validation) || message);
  } else {
    bcrypt.compare(password, user.password, async (err, success) => {
      if (success) {
        const tokens = createTokens(userDto(user));
        await updateToken(user.id, tokens.refreshToken);
        res
          .cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
          })
          .json({ ...tokens, ...userDto(user) });
      } else {
        res.status(400).json(message);
      }
    });
  }
});

authRouter.delete("/logout", (req, res) => {
  const { refreshToken } = req.cookies;
  loadedModels.User.update(
    { refreshToken: null },
    {
      where: { refreshToken },
    }
  );
  res.clearCookie("refreshToken").sendStatus(200);
});

authRouter.get("/refresh", async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.sendStatus(401);
  }
  const verifiedToken = verifyToken(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  const foundUserByToken = await findToken(refreshToken);
  if (!verifiedToken || !foundUserByToken) {
    return res.sendStatus(401);
  }
  const tokens = createTokens(userDto(foundUserByToken));
  await updateToken(foundUserByToken.id, tokens.refreshToken);
  res
    .cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .json({ ...tokens, ...userDto(foundUserByToken) });
});

authRouter.get("/activate/:userId", async (req, res) => {
  try {
    await loadedModels.User.update(
      { isActivated: true },
      {
        where: {
          id: req.params.userId,
        },
      }
    );
    res.redirect(`${process.env.BASE_URL_CLIENT}/profile`);
  } catch (e) {
    res.sendStatus(500);
  }
});

export default authRouter;
