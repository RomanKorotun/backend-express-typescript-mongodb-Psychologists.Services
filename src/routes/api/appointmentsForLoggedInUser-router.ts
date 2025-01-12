import express, { Router } from "express";
import { ctrlWrapper, isValidBody } from "../../decorators/index.js";
import {
  addAppointmentsForLoggedInUser,
  appointmentIsComplete,
} from "../../controllers/appointments-controller/index.js";
import { authenticate, isEmptyBody } from "../../middleware/index.js";
import { appointmentForLoggedInUserSchema } from "../../models/Appointment.js";

const appointmentsForLoggedInUserRouter: Router = express.Router();

appointmentsForLoggedInUserRouter.use(authenticate);

appointmentsForLoggedInUserRouter.post(
  "/",
  isEmptyBody,
  isValidBody(appointmentForLoggedInUserSchema),
  ctrlWrapper(addAppointmentsForLoggedInUser)
);

appointmentsForLoggedInUserRouter.get(
  "/:clientId",
  ctrlWrapper(appointmentIsComplete)
);

export default appointmentsForLoggedInUserRouter;
