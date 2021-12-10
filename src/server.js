import express from "express";
import morgan from "morgan";
import "./db";

// router
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// common
const App = express();
const PORT = 4000;

// middleware
const logger = morgan("dev");


App.set("view engine", "pug");
App.set("views", process.cwd() + "/src/views");

App.use(logger);
App.use(express.urlencoded({ extended: true }));
App.use("/", rootRouter);
App.use("/users", userRouter);
App.use("/videos", videoRouter);

const handleListen = () => console.log(`✅ Server listening on http://localhost:${PORT}`);
App.listen(PORT, handleListen);