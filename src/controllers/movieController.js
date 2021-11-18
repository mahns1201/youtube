import {
    getMovieById,
    getMovies,
    getMovieByMinimumRating,
    getMovieByMinimumYear
} from "../db/db.js";

export const movies = (req, res) => {
    const movies = getMovies();

    return res.render("movies", { movies: movies });
};
export const movieDetail = (req, res) => {
    const { id } = req.params;
    const movie = getMovieById(id);

    console.log("id ::::", id);
    console.log("movie ::::", movie);

    return res.render("movieDetail", { movie: movie });
};
export const filterMovie = (req, res) => {
    console.log(req.body);
    const { year, rating } = req.body;

    console.log(year, rating)

    let movies;

    year ? movies = getMovieByMinimumYear(year) : movies = getMovieByMinimumRating(rating);

    return res.render("movies", { movies: movies });
};
