// Server's Configuration Setting
import "dotenv/config";
import App from "./server";
import "./db";
import "./models/Video";
import "./models/User";

const PORT = 4000;
const handleListen = () => console.log(`✅ Server listening on http://localhost:${PORT}`);

App.listen(PORT, handleListen);