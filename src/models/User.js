import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
});

UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 5);
});

const model = mongoose.model("User", UserSchema);

export default model;

