import { model, Schema } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

userSchema.methods.hashPassword = async function () {
  this.password = await bcryptjs.hash(this.password, 10);
};

userSchema.methods.comparePassword = async function (password) {
  const isCompare = await bcryptjs.compare(password, this.password);
  return isCompare;
};

const User = model("user", userSchema);

export default User;
