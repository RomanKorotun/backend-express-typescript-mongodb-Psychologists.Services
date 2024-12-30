import express, { Router } from "express";
import { ctrlWrapper } from "../../decorators/index.js";
import {
  getAllPsychologistsForNotLoggedInUser,
  getOnePsychologistForNotLoggedInUser,
} from "../../controllers/psychologists-controller/index.js";
import isValid from "../../middleware/isValid.js";

const psychologistsNotLoggedInRouter: Router = express.Router();

psychologistsNotLoggedInRouter.get(
  "/",
  ctrlWrapper(getAllPsychologistsForNotLoggedInUser)
);

psychologistsNotLoggedInRouter.get(
  "/:id",
  isValid,
  ctrlWrapper(getOnePsychologistForNotLoggedInUser)
);

export default psychologistsNotLoggedInRouter;
