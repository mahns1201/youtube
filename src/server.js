import express from "express";

const PORT = 4000;
const app = express();

const handleHome = () => console.log("trying to request.");


app.get("/", handleHome);






const handleListening = () => console.log(`server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening)