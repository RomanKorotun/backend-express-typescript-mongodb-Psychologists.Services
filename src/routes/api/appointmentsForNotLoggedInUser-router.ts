import express, { Router } from "express";
import { ctrlWrapper, isValidBody } from "../../decorators/index.js";
import {
  addAppointmentsForNotLoggedInUser,
  appointmentIsComplete,
} from "../../controllers/appointments-controller/index.js";
import { isEmptyBody } from "../../middleware/index.js";
import { appointmentForNotLoggedInUserSchema } from "../../models/Appointment.js";

const appointmentsForNotLoggedInUserRouter: Router = express.Router();

appointmentsForNotLoggedInUserRouter.post(
  "/",
  isEmptyBody,
  isValidBody(appointmentForNotLoggedInUserSchema),
  ctrlWrapper(addAppointmentsForNotLoggedInUser)
);

appointmentsForNotLoggedInUserRouter.get(
  "/:clientId",
  ctrlWrapper(appointmentIsComplete)
);

export default appointmentsForNotLoggedInUserRouter;
