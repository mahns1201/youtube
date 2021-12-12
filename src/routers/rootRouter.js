import express from "express";

import { home } from "../controllers/rootController";
import { search } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", search);

export default rootRouter;