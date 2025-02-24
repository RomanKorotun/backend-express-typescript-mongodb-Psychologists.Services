import express, { Router } from "express";
import { ctrlWrapper, isValidBody } from "../../decorators/index.js";
import {
  addAppointmentsForLoggedInUser,
  appointmentIsComplete,
  getAppointmentForLoggedInUser,
  getAppointmentsForLoggedInUser,
} from "../../controllers/appointments-controller/index.js";
import { authenticate, isEmptyBody, isValid } from "../../middleware/index.js";
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

appointmentsForLoggedInUserRouter.get(
  "/",
  ctrlWrapper(getAppointmentsForLoggedInUser)
);

appointmentsForLoggedInUserRouter.get(
  "/:id/one",
  isValid,
  ctrlWrapper(getAppointmentForLoggedInUser)
);

export default appointmentsForLoggedInUserRouter;
