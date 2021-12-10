import express from "express";
import morgan from "morgan";

// router
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// common
const App = express();

// middleware
const logger = morgan("dev");


App.set("view engine", "pug");
App.set("views", process.cwd() + "/src/views");

App.use(logger);
App.use(express.urlencoded({ extended: true }));
App.use("/", rootRouter);
App.use("/users", userRouter);
App.use("/videos", videoRouter);

export default App;