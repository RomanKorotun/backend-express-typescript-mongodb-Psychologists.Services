import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleAddSettings, handleSaveError } from "./hooks.js";

const paymentStatusList = ["pending", "completed", "failed"];
const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const AppointmentSchema = new Schema(
  {
    psychologistId: {
      type: Schema.Types.ObjectId,
      ref: "psychologist",
      required: true,
    },
    clientId: { type: String, required: true },
    client_name: { type: String, required: true },
    client_phone: { type: String, required: true },
    client_email: { type: String, match: emailRegexp, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: paymentStatusList,
      default: "pending",
    },
    is_reserved: { type: Boolean, default: true },
    meetingLink: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

AppointmentSchema.post("save", handleSaveError);
AppointmentSchema.pre("findOneAndUpdate", handleAddSettings);
AppointmentSchema.post("findOneAndUpdate", handleSaveError);

export const appointmentForNotLoggedInUserSchema = Joi.object({
  psychologistId: Joi.string().required(),
  clientId: Joi.string().required(),
  client_name: Joi.string().required(),
  client_phone: Joi.string().required(),
  client_email: Joi.string()
    .pattern(emailRegexp)
    .message("Invalid email")
    .required(),
  date: Joi.string().required(),
  time: Joi.string().required(),
});

export const appointmentForLoggedInUserSchema = Joi.object({
  psychologistId: Joi.string().required(),
  clientId: Joi.string().required(),
  client_phone: Joi.string().required(),
  date: Joi.string().required(),
  time: Joi.string().required(),
});

export const createPaymentSchema = Joi.object({
  amount: Joi.number().required(),
  currency: Joi.string().required(),
  description: Joi.string().required(),
  orderId: Joi.string().required(),
});

const Appointment = model("appointment", AppointmentSchema);
export default Appointment;
