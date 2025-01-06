import express, { Router } from "express";
import { ctrlWrapper } from "../../decorators/index.js";
import {
  getAllPsychologistsForNotLoggedInUser,
  getOnePsychologistForNotLoggedInUser,
} from "../../controllers/psychologists-controller/index.js";
import isValid from "../../middleware/isValid.js";

const psychologistsForNotLoggedInUserRouter: Router = express.Router();

psychologistsForNotLoggedInUserRouter.get(
  "/",
  ctrlWrapper(getAllPsychologistsForNotLoggedInUser)
);

psychologistsForNotLoggedInUserRouter.get(
  "/:id",
  isValid,
  ctrlWrapper(getOnePsychologistForNotLoggedInUser)
);

export default psychologistsForNotLoggedInUserRouter;
