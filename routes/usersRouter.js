import express from "express";
import { signup } from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { signupShema } from "../schemas/userSchemas.js"
const usersRouter = express.Router();

usersRouter.post("/signup", validateBody(signupShema), signup);
usersRouter.post("/login");
usersRouter.post("/logout");
usersRouter.get("/current");

export default usersRouter;
