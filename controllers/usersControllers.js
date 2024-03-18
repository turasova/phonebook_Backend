import {
  createUser,
  isUserExist,
  loginUser,
} from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";
import User from "../db/models/User.js";

export const signup = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const user = await isUserExist(email);
    if (user) {
      throw HttpError(409, "User is already exist");
    }

    const newUser = await createUser(req.body);

    res.status(201).json({
      token: newUser.token,
      user: {
        name,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await isUserExist(email);

    if (!user) {
      throw HttpError(401, "Email or password wrong");
    }

    const isUserPasswordCorrect = await user.comparePassword(password);

    if (!isUserPasswordCorrect) {
      throw HttpError(401, "Email or password wrong");
    }

    const updatedUser = await loginUser(user);

    res.json({
      token: updatedUser.token,
      user: {
        name: updatedUser.name,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};
