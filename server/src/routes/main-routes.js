import { Router } from "express";

const mainRouter = Router();

mainRouter.get("/", (req, res) => {
  res.sendStatus(200);
});

export default mainRouter;
