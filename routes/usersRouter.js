import express from "express";

const usersRouter = express.Router();

usersRouter.post("/signup");
usersRouter.post("/login");
usersRouter.post("/logout");
usersRouter.get("/current");

export default usersRouter;
