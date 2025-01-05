import express, { Router } from "express";
import { ctrlWrapper, isValidBody } from "../../decorators/index.js";
import {
  addReservedTimeForDay,
  getReservedTimesForDay,
} from "../../controllers/appointments-controller/index.js";
import { isEmptyBody, isValid } from "../../middleware/index.js";
import { addReservedTimeSchema } from "../../models/ReservedTime.js";

const reserdevTimesRouter: Router = express.Router();

reserdevTimesRouter.get(
  "/:id/:date",
  isValid,
  ctrlWrapper(getReservedTimesForDay)
);

reserdevTimesRouter.post(
  "/",
  isEmptyBody,
  isValidBody(addReservedTimeSchema),
  ctrlWrapper(addReservedTimeForDay)
);

export default reserdevTimesRouter;
