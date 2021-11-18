import express from "express";
import { movies, movieDetail, filterMovie } from "../controllers/movieController";

const movieRouter = express.Router();

movieRouter.route("/").get(movies).post(filterMovie);
movieRouter.get("/:id(\\d+)", movieDetail);

export default movieRouter;
