import express from "express";

import { video } from "../controllers/videoController"

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", video);

export default videoRouter;