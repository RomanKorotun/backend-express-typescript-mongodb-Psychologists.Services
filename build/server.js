import app from "./app.js";
import mongoose from "mongoose";
import "dotenv/config.js";
const { DB_HOST, PORT = 3030 } = process.env;
if (DB_HOST) {
    mongoose
        .connect(DB_HOST)
        .then(() => {
        console.log("Database connect success");
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT} PORT`);
        });
    })
        .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });
}
else {
    console.log("DB_HOST is not define");
}
// що було до змін
// {
//   "watch": ["src"],
//   "ext": "ts",
//   "ignore": ["src/**/*.test.ts", "*.js", "*.map"],
//   "execMap": {
//     "ts": "node --loader ts-node/esm ./src/server.ts"
//   }
// }
//# sourceMappingURL=server.js.map