import { createUser, isUserExist } from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";

export const signup = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await isUserExist(email);
    if (user) {
      throw HttpError(409, "User is already exist");
    }

    const newUser = await createUser(req.body);
  } catch (error) {
    next(error);
  }
};
