import jwt from "jsonwebtoken";

import models from "../../models/index.js";

const loadedModels = await models;

export const authMiddleware = (req, res, next) => {
  const accessTokenHeader = req.headers.authorization;
  const token = accessTokenHeader?.split(" ")[1];
  const user = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
  if (!user) {
    return res.sendStatus(401);
  }
  req.user = user;
  next();
};

export const createTokens = (payload) => ({
  accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  }),
  refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  }),
});

export const updateToken = async (userId, refreshToken) => {
  const user = await loadedModels.User.update(
    { refreshToken },
    {
      where: {
        id: userId,
      },
    }
  );
  return user;
};

export const verifyToken = (token, secret) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return verifiedToken;
  } catch (e) {
    return null;
  }
};

export const findToken = async (refreshToken) => {
  const user = await loadedModels.User.findOne({
    where: {
      refreshToken,
    },
  });
  return user;
};
