import express from "express";

const App = express();
const PORT = 4000;
const startMessage = () => console.log(`✅ Server listening on http://localhost:${PORT}`);

App.get("/", (req, res) => (res.send("<h1>home</h1>")));

App.listen(PORT, startMessage);