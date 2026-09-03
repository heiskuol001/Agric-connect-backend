import app from "./app.js";
import { configDotenv } from "dotenv";
import connectDB from "./config/db.js";

configDotenv();

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log("Server failed to start:", error.message);
    }
};

startServer();