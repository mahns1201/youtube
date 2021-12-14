import express from "express";

import { user, startGithubLogin, finishGithubLogin, logout } from "../controllers/userController"

const userRouter = express.Router();

userRouter.get("/", user);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/logout", logout);

export default userRouter;