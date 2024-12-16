import express from "express";
import { ctrlWrapper } from "../../decorators/index.js";
import { psychologistsNotLoggedIn } from "../../controllers/psychologists-controller/index.js";
const psychologistsNotLoggedInRouter = express.Router();
psychologistsNotLoggedInRouter.get("/", ctrlWrapper(psychologistsNotLoggedIn));
export default psychologistsNotLoggedInRouter;
//# sourceMappingURL=psychologistsNotLoggedIn-router.js.map