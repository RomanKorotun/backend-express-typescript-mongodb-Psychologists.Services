import express, { Router } from "express";
import { ctrlWrapper, isValidBody } from "../../decorators/index.js";
import {
  addAppointmentNotLoggedInUser,
  getAppointmentNotLoggedInUser,
} from "../../controllers/appointments-controller/index.js";
import { isEmptyBody, isValid } from "../../middleware/index.js";
import { appointmentNotLoggedInSchema } from "../../models/Appointment.js";

const appointmentsNotLoggedInRouter: Router = express.Router();

appointmentsNotLoggedInRouter.post(
  "/",
  isEmptyBody,
  isValidBody(appointmentNotLoggedInSchema),
  ctrlWrapper(addAppointmentNotLoggedInUser)
);

appointmentsNotLoggedInRouter.get(
  "/:clientId",
  ctrlWrapper(getAppointmentNotLoggedInUser)
);

export default appointmentsNotLoggedInRouter;
