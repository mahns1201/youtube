import mongoose from "mongoose";

const { Schema } = mongoose;

const movieSchema = new Schema({
    title: {
        type: String,
        required
    },
    summary: {
        type: String,
        required
    },
    year: {
        type: String,
        required
    },
    rating: {
        type: String,
        required
    },
    genres: {
        type: [{ type: Array }],
        required
    },
    meta: {
        views: String,
        rating: Number,
    },

});

const Movie = mongoose.model('Movie', movieSchema);
export default Movie
