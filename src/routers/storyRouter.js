import express from "express";

import {
  seeStory,
  editStory,
  deleteStory
} from "../controllers/storiesController";

const storyRouter = express.Router();

storyRouter.get("/:id(\\d+)", seeStory);
storyRouter.get("/:id(\\d+)/edit", editStory);
storyRouter.get("/:id(\\d+)/delete", deleteStory);

export default storyRouter;
