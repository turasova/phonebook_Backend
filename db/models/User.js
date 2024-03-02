import { string } from "joi";
import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: string,
      require: true,
    },
    email: {
      type: string,
      require: true,
    },
    password: {
      type: string,
      require: true,
    },
    token: {
      type: string,
      default: null,
    },
  },
  { versionKey: false }
);

const User = model("user", userSchema);

export default User;
