import express from "express";

import { home } from "../controllers/rootController";
import { joinGet, joinPost, loginGet, loginPost } from "../controllers/userController";
import { search } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", search);
rootRouter.route("/join").get(joinGet).post(joinPost);
rootRouter.route("/login").get(loginGet).post(loginPost);

export default rootRouter;