import "./db/db";
import "./models/Movie";
import "./models/User";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";
import movieRouter from "./routers/movieRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares/setSiteTitle";

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(localsMiddleware);

app.use(
    session({
        secret: "Hello!",
        resave: true,
        saveUninitialized: true,
    })
);

app.use((req, res, next) => {
    req.sessionStore.all((error, sessions) => {
        console.log(sessions);
        next();
    });
});

app.use("/assets", express.static("assets"));
app.use("/", movieRouter);
app.use("/user", userRouter);

const PORT = 4000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
