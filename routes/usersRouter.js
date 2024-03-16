import express from "express";
import { signup } from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { signupUserSchema } from "../schemas/userSchemas.js";
const usersRouter = express.Router();

usersRouter.post("/signup", validateBody(signupUserSchema), signup);
usersRouter.post("/login");
usersRouter.post("/logout");
usersRouter.get("/current");

export default usersRouter;
