import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { DB_MONGO } = process.env;

async function dbConnect() {
  try {
    await mongoose.connect(DB_MONGO);

    console.log("Database connection is successful");
  } catch (error) {
    console.log(error);
  }
}
export default dbConnect;
