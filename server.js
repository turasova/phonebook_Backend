import dotenv from "dotenv";
import dbConnect from "./db/connection.js";
import app from "./app.js";

dotenv.config();

const { PORT } = process.env;

async function startServer() {
  await dbConnect();

  app.listen(PORT, (error) => {
    if (error) {
      console.log(error);
    }
    console.log(`Server is running. Use our API on port: ${PORT}`);
  });
}

startServer();
