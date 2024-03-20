import {
  createUser,
  isUserExist,
  loginUser,
} from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";
import User from "../db/models/User.js";
import gravatar from "gravatar";

export const signup = async (req, res, next) => {
  const { name, email } = req.body;
  const avatar = gravatar.url(email);
  try {
    const user = await isUserExist(email);
    if (user) {
      throw HttpError(409, "User is already exist");
    }

    const newUser = await createUser({ ...req.body, avatar: avatar });

    res.status(201).json({
      token: newUser.token,
      user: {
        name,
        email,
        avatar,
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
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const current = (req, res, next) => {
  const { email, name, avatar } = req.user;
  res.json({ email, name, avatar });
};

export const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
