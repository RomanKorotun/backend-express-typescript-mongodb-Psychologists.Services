import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import logger from "morgan";
import authRouter from "./routes/api/auth-router.js";
import psychologistsNotLoggedInRouter from "./routes/api/psychologistsNotLoggedIn-router.js";
import psychologistsLoggedInRouter from "./routes/api/psychologistsLoggedIn-router.js";
import psychologistsFavoriteRouter from "./routes/api/psychologistsFavorite-router.js";

const app: Application = express();
const server = http.createServer(app);

export const wsServer = new Server(server, { cors: { origin: "*" } });
wsServer.on("connection", () => console.log("New frontend connected"));

const formatsLogger = process.env.NODE_ENV === "development" ? "dev" : "short";

app.use(cors());
app.use(logger(formatsLogger));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/not-loggedin/psychologists", psychologistsNotLoggedInRouter);
app.use("/api/loggedin/psychologists", psychologistsLoggedInRouter);
app.use("/api/psychologists/favorite", psychologistsFavoriteRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((error: any, req: Request, res: Response, next: NextFunction): void => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({ message });
});

export default server;
