/*
You DONT have to import the Movie with your username.
Because it's a default export we can nickname it whatever we want.
So import Movie from "./models"; will work!
You can do Movie.find() or whatever you need like normal!
*/
import Movie from "../models/Movie";

export const home = async (req, res) => {
    const movies = await Movie.find({});
    res.render("movies", { pageTitle: "Home", movies });
};

export const create = async (req, res) => {
    if (req.method === "GET") {
        res.render("create", { pageTitle: "Create" });
    } else if (req.method === "POST") {
        // const {
        //     body: { title, summary, year, rating, genres }
        // } = req;

        // 위와 동일
        const { title, summary, year, rating, genres } = req.body;

        const newMovie = await Movie.create({
            title,
            summary,
            year,
            rating,
            genres: genres.split(",")
        });
        res.redirect(`/${newMovie.id}`);
    }
};

export const detail = async (req, res) => {
    const {
        params: { id }
    } = req;
    const movie = await Movie.findById(id);
    res.render("detail", { movie, pageTitle: movie.title });
};

export const edit = async (req, res) => {
    const {
        params: { id }
    } = req;
    if (req.method === "GET") {
        const movie = await Movie.findById(id);
        res.render("edit", { pageTitle: "Edt", movie });
    } else if (req.method === "POST") {
        const {
            body: { title, synopsis, year, rating, genres },
            params: { id }
        } = req;
        await Movie.findByIdAndUpdate(id, {
            title,
            synopsis,
            year,
            rating,
            genres: genres.split(",")
        });
        res.redirect(`/${id}`);
    }
};

export const remove = async (req, res) => {
    const {
        params: { id }
    } = req;
    await Movie.findByIdAndDelete(id);
    res.redirect("/");
};

export const search = async (req, res) => {
    const {
        query: { title }
    } = req;
    const movies = await Movie.find({
        title: { $regex: new RegExp(`${title}$`, "i") }
    });
    res.render("movies", {
        pageTitle: `Filtering by title: ${title}`,
        movies
    });
};
