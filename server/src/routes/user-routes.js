import { Router } from "express";

import { db } from "../index.js";
import { formatDataTime } from "../utils/data-formatter-helpers.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await db.any(
      "SELECT user_id,username,date_created FROM users"
    );
    const sortedDate = formatDataTime(users);
    res.json(sortedDate);
  } catch (e) {
    console.log(e);
  }
});

export default usersRouter;
