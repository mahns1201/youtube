import App from "./server";
import "./db";
import "./models/Video";

const PORT = 4000;
const handleListen = () => console.log(`✅ Server listening on http://localhost:${PORT}`);

App.listen(PORT, handleListen);