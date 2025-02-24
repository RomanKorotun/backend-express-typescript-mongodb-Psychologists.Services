import express, { Router } from "express";
import { ctrlWrapper, isValidBody } from "../../decorators/index.js";
import { isEmptyBody } from "../../middleware/index.js";
import { createPaymentSchema } from "../../models/Appointment.js";
import {
  createPaymentCallback,
  createPayment,
} from "../../controllers/payment-controller/index.js";

const paymentRouter: Router = express.Router();

paymentRouter.post(
  "/",
  isEmptyBody,
  isValidBody(createPaymentSchema),
  ctrlWrapper(createPayment)
);

paymentRouter.post("/callback", ctrlWrapper(createPaymentCallback));

export default paymentRouter;
