import { Router } from "express";
import models from "../../models/index.js";
import { userDto } from "../utils/user-dto.js";

const usersRouter = Router();

const loadedModels = await models;

usersRouter.get("/", async (req, res) => {
  try {
    const users = await loadedModels.User.findAll();
    const parsedUsers = users.map((user) => ({
      ...userDto(user),
      created: user.createdAt,
      updated: user.updatedAt,
    }));
    res.json(parsedUsers);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default usersRouter;
