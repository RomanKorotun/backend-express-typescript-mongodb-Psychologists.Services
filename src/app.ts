import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import logger from "morgan";
import authRouter from "./routes/api/auth-router.js";
import psychologistsForNotLoggedInUserRouter from "./routes/api/psychologistsForNotLoggedInUser-router.js";
import psychologistsForLoggedInUserRouter from "./routes/api/psychologistsForLoggedInUser-router.js";
import psychologistsFavoriteRouter from "./routes/api/psychologistsFavorite-router.js";
import appointmentsForNotLoggedInUserRouter from "./routes/api/appointmentsForNotLoggedInUser-router.js";
import reserdevTimesRouter from "./routes/api/reservedTime-router.js";

const app: Application = express();
const server = http.createServer(app);

export const wsServer = new Server(server, { cors: { origin: "*" } });
wsServer.on("connection", () => console.log("New frontend connected"));

const formatsLogger = process.env.NODE_ENV === "development" ? "dev" : "short";

app.use(cors());
app.use(logger(formatsLogger));
app.use(express.json());

app.use("/api/auth", authRouter);

app.use(
  "/api/not-loggedin/psychologists",
  psychologistsForNotLoggedInUserRouter
);
app.use("/api/loggedin/psychologists", psychologistsForLoggedInUserRouter);
app.use("/api/psychologists/favorite", psychologistsFavoriteRouter);

app.use("/api/not-loggedin/appointments", appointmentsForNotLoggedInUserRouter);
app.use("/api/reserved-times", reserdevTimesRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((error: any, req: Request, res: Response, next: NextFunction): void => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({ message });
});

export default server;
