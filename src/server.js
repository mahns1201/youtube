import express from "express";
// import morgan from "morgan";

import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;

const app = express();

// const logger = morgan("dev");

const URLLogger = (req, res, next) => {
  console.log("Path: ", req.path);
  next();
};

const timeLogger = (req, res, next) => {
  const now = new Date();
  console.log(`Time: ${now.getFullYear()}.${now.getMonth()}.${now.getDate()}`);
  next();
};

const protectorLogger = (req, res, next) => {
  if (req.path === "/protected") {
    return res.send("<h1>Forbidden</h1>");
  }
  next();
};

const secureLogger = (req, res, next) => {
  if (req.protocol === "https") {
    console.log("Secure ✅");
  } else {
    console.log("Insecure ❌");
  }
  next();
};

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(URLLogger, timeLogger, protectorLogger, secureLogger);
app.use(express.urlencoded({ extended: true })); // html에 있는 javascript를 이해할 수 있도록 함.
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const listen = () =>
  console.log(`server listening on port http://localhost:${PORT}`);

app.listen(PORT, listen);
