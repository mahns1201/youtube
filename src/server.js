import express from "express";
import morgan from "morgan";

const App = express();
const PORT = 4000;
const startMessage = () => console.log(`✅ Server listening on http://localhost:${PORT}`);

const logger = morgan("dev");

App.use(logger);
App.get("/", (req, res) => (res.send("<h1>home</h1>")));

App.listen(PORT, startMessage);