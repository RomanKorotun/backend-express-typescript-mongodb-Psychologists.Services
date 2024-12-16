import express, { Router } from "express";
import { ctrlWrapper } from "../../decorators/index.js";
import { psychologistsNotLoggedIn } from "../../controllers/psychologists-controller/index.js";

const psychologistsNotLoggedInRouter: Router = express.Router();

psychologistsNotLoggedInRouter.get("/", ctrlWrapper(psychologistsNotLoggedIn));

export default psychologistsNotLoggedInRouter;
