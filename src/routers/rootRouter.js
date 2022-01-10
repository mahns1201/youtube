import express from "express";
import { publicOnlyMiddleware } from "../middlewares";

import { home } from "../controllers/rootController";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController";
import { search } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", search);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);

export default rootRouter;