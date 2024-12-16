import express, { Router } from "express";
import { ctrlWrapper } from "../../decorators/index.js";
import {
  psychologistsLoggedIn,
  updatePsychologistsCardLoggedIn,
} from "../../controllers/psychologists-controller/index.js";
import authenticate from "../../middleware/authenticate.js";

const psychologistsLoggedInRouter: Router = express.Router();

psychologistsLoggedInRouter.get(
  "/",
  authenticate,
  ctrlWrapper(psychologistsLoggedIn)
);

psychologistsLoggedInRouter.put(
  "/:id",
  authenticate,
  ctrlWrapper(updatePsychologistsCardLoggedIn)
);

export default psychologistsLoggedInRouter;
