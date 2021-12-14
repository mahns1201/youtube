import express from "express";

import { home } from "../controllers/rootController";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController";
import { search } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", search);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);

export default rootRouter;