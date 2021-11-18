import express from "express";
import globalRouter from "./routers/globalRouter";
import storyRouter from "./routers/storyRouter";
import userRouter from "./routers/userRouter";
import movieRouter from "./routers/movieRouter";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }))
app.use("/", globalRouter);
app.use("/movies", movieRouter);
app.use("/users", userRouter);
app.use("/stories", storyRouter);

const listen = () =>
  console.log(`server listening on port http://localhost:${PORT}`);

app.listen(PORT, listen);