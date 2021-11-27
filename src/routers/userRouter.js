import express from "express";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/join").get(getJoin).post(postJoin);
userRouter.route("/login").get(getLogin).post(postLogin);

export default userRouter;