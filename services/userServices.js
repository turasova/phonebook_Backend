import User from "../db/models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

export const isUserExist = async (email) => {
  const user = await User.findOne({ email });

  return user;
};


const signToken = async (id) => {
  const payload = { id }
  const { SECRET_KEY } = process.env;
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};




export const createUser = async (userData) => {

  const newUser = new User({
    ...userData,

  });
  await newUser.hashPassword();
  await newUser.save();
  const token = await signToken(newUser._id);
  const user = await User.findByIdAndUpdate(newUser._id, { token }, { new: true });

  return user;
};
