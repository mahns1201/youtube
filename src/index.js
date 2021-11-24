import "./db/db";
import "./models/Movie";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import movieRouter from "./routers/movieRouter";
import { localsMiddleware } from "./middlewares/setSiteTitle";

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(localsMiddleware);
app.use("/", movieRouter);

const PORT = 4000;
app.listen(PORT, () => console.log(`✅  Server Ready!`));
