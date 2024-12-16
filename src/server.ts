import app from "./app.js";
import mongoose, { Error } from "mongoose";
import "dotenv/config.js";

const { DB_HOST, PORT = 3030 } = process.env;

if (DB_HOST) {
  mongoose
    .connect(DB_HOST)
    .then((): void => {
      console.log("Database connect success");
      app.listen(PORT, (): void => {
        console.log(`Server running on ${PORT} PORT`);
      });
    })
    .catch((error: Error): void => {
      console.log(error.message);
      process.exit(1);
    });
} else {
  console.log("DB_HOST is not define");
}
