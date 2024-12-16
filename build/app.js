import express from "express";
import cors from "cors";
import logger from "morgan";
import authRouter from "./routes/api/auth-router.js";
import psychologistsNotLoggedInRouter from "./routes/api/psychologistsNotLoggedIn-router.js";
import psychologistsLoggedInRouter from "./routes/api/psychologistsLoggedIn-router.js";
import psychologistsFavoriteRouter from "./routes/api/psychologistsFavorite-router.js";
const app = express();
const formatsLogger = process.env.NODE_ENV === "development" ? "dev" : "short";
app.use(cors());
app.use(logger(formatsLogger));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/not-loggedin/psychologists", psychologistsNotLoggedInRouter);
app.use("/api/loggedin/psychologists", psychologistsLoggedInRouter);
app.use("/api/psychologists/favorite", psychologistsFavoriteRouter);
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});
app.use((error, req, res, next) => {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
});
export default app;
//# sourceMappingURL=app.js.map