import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
    },

    name: {
        type: String,
        require: true,
    },

    password: {
        type: String,
        require: true,
    }
});

const model = mongoose.model("User", UserSchema);

export default model;

