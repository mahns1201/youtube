import express from "express";
import morgan from "morgan";

// router
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const App = express();
const PORT = 4000;

const logger = morgan("dev");

App.use(logger);
App.use("/", rootRouter);
App.use("/users", userRouter);
App.use("/videos", videoRouter);

App.listen(PORT, () => console.log(`✅ Server listening on http://localhost:${PORT}`));