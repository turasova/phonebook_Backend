import dotenv from 'dotenv';
import User from '../db/models/User.js';
import jwt from 'jsonwebtoken';

dotenv.config();
const { SECRET_KEY, TOKEN_LIVE } = process.env;

export const isUserExist = async (email) => {
  const user = await User.findOne({ email });

  return user;
};

function signToken(id) {
  const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: TOKEN_LIVE });

  return token;
}

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

export const loginUser = async (user) => {
  const token = await signToken(user._id);

  const updateUser = await User.findByIdAndUpdate(user._id, { token }, { new: true });

  return updateUser;
};
