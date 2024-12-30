import express, { Router } from "express";
import { ctrlWrapper, isValidBody } from "../../decorators/index.js";
import {
  addReviewForLoggedInUser,
  getAllPsychologistsForLoggedInUser,
  getOnePsychologistForLoggedInUser,
  toggleFavoriteCardForLoggedInUser,
} from "../../controllers/psychologists-controller/index.js";
import authenticate from "../../middleware/authenticate.js";
import { isEmptyBody, isValid } from "../../middleware/index.js";
import { psychologistReviewSchema } from "../../models/Psychologist.js";

const psychologistsLoggedInRouter: Router = express.Router();

psychologistsLoggedInRouter.get(
  "/",
  authenticate,
  ctrlWrapper(getAllPsychologistsForLoggedInUser)
);

psychologistsLoggedInRouter.get(
  "/:id",
  authenticate,
  isValid,
  ctrlWrapper(getOnePsychologistForLoggedInUser)
);

psychologistsLoggedInRouter.put(
  "/:id/favorite",
  authenticate,
  isValid,
  ctrlWrapper(toggleFavoriteCardForLoggedInUser)
);

psychologistsLoggedInRouter.post(
  "/:id/reviews",
  authenticate,
  isValid,
  isEmptyBody,
  isValidBody(psychologistReviewSchema),
  ctrlWrapper(addReviewForLoggedInUser)
);

export default psychologistsLoggedInRouter;
