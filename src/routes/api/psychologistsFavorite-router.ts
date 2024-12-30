import express, { Router } from "express";
import { authenticate } from "../../middleware/index.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import { getAllFavoritePsychologistsForLoggedInUser } from "../../controllers/psychologists-controller/index.js";

const psychologistsFavoriteRouter: Router = express.Router();

psychologistsFavoriteRouter.get(
  "/",
  authenticate,
  ctrlWrapper(getAllFavoritePsychologistsForLoggedInUser)
);

export default psychologistsFavoriteRouter;
