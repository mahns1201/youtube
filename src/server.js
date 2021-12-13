import express from "express";
import morgan from "morgan";
import session from "express-session";

// router
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// middleware
import { localMiddleware } from "./middlewares";


// common
const App = express();

// middleware
const logger = morgan("dev");


App.set("view engine", "pug");
App.set("views", process.cwd() + "/src/views");

App.use(logger);
App.use(express.urlencoded({ extended: true }));

App.use(
    session({
        secret: "Hello",
        resave: true,
        saveUninitialized: true,
    })
);

App.use(localMiddleware);

App.use("/", rootRouter);
App.use("/users", userRouter);
App.use("/videos", videoRouter);

export default App;