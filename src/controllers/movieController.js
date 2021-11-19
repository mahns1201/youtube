import {
    getMovieById,
    getMovies,
    getMovieByMinimumRating,
    getMovieByMinimumYear,
    addMovie,
} from "../db/db.js";

export const movies = (req, res) => {
    const movies = getMovies();

    return res.render("movies", { movies: movies });
};

export const movieDetail = (req, res) => {
    const { id } = req.params;
    const movie = getMovieById(id);

    return res.render("movieDetail", { movie: movie });
};

export const filterMovie = (req, res) => {
    const { year, rating } = req.body;
    let movies;

    year ? movies = getMovieByMinimumYear(year) : movies = getMovieByMinimumRating(rating);

    return res.render("movies", { movies: movies });
};

export const addMovieForm = (req, res) => {
    return res.render("addMovieForm");
};

export const addMovieController = (req, res) => {
    const { title, synopsis, genres } = req.body;
    console.log(title, synopsis, genres);

    addMovie(title, synopsis, genres);
    const movies = getMovies();

    return res.render("movies", { movies: movies });
};

// solution2
// export const add = (req, res) => {
//     if (req.method === "GET") {
//       return res.render("add", { pageTitle: "Add Movie" });
//     } else if (req.method === "POST") {
//       const {
//         body: { title, genres, synopsis }
//       } = req;
//       addMovie({ title, synopsis, genres: genres.split(",") });
//       return res.redirect("/");
//     }
//   };
