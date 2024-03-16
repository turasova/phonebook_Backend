import { createUser, isUserExist } from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";

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
