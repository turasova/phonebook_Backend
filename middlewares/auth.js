import dotenv from "dotenv";
import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import User from "../db/models/User.js";
dotenv.config();

const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw HttpError(401, "Not Authorized");
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      throw HttpError(401, "Not Authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
