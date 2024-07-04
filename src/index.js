import { startServer } from "./server.js";
import { initMangoDB } from "./db/initMangoConnection.js";

async function initServer() {
    await initMangoDB();
    startServer();
}

initServer();
