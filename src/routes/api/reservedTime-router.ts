import express, { Router } from "express";
import { ctrlWrapper, isValidBody } from "../../decorators/index.js";
import {
  addReservedTimesForDay,
  getReservedTimesForDay,
} from "../../controllers/appointments-controller/index.js";
import { isEmptyBody, isValid } from "../../middleware/index.js";
import { addReservedTimesSchema } from "../../models/ReservedTime.js";

const reserdevTimesRouter: Router = express.Router();

reserdevTimesRouter.get(
  "/:id/:date",
  isValid,
  ctrlWrapper(getReservedTimesForDay)
);

reserdevTimesRouter.post(
  "/",
  isEmptyBody,
  isValidBody(addReservedTimesSchema),
  ctrlWrapper(addReservedTimesForDay)
);

export default reserdevTimesRouter;
