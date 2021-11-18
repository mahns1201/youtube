import express from "express";
import { movies, movieDetail, filterMovie, addMovieForm, addMovieController } from "../controllers/movieController";

const movieRouter = express.Router();

movieRouter.route("/").get(movies).post(filterMovie);
movieRouter.get("/:id(\\d+)", movieDetail);
movieRouter.route("/add").get(addMovieForm).post(addMovieController);

export default movieRouter;
