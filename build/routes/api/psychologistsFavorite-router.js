import express from "express";
import { authenticate } from "../../middleware/index.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import psychologistsFavorite from "../../controllers/psychologists-controller/psychologistsFavorite.js";
const psychologistsFavoriteRouter = express.Router();
psychologistsFavoriteRouter.get("/", authenticate, ctrlWrapper(psychologistsFavorite));
export default psychologistsFavoriteRouter;
//# sourceMappingURL=psychologistsFavorite-router.js.map