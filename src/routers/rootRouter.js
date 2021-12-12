import express from "express";

import { home, joinGet, joinPost, loginGet, loginPost } from "../controllers/rootController";
import { search } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", search);
rootRouter.route("/join").get(joinGet).post(joinPost);
rootRouter.route("/login").get(loginGet).post(loginPost);

export default rootRouter;