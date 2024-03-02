
import { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs';

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
  this.password = await bcrypt.hash(this.password, 10)
}
const User = model("user", userSchema);

export default User;
