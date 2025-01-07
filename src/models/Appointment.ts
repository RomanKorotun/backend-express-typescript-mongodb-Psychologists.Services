import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError } from "./hooks.js";

const paymentStatusList = ["pending", "paid"];
const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const AppointmentSchema = new Schema(
  {
    psychologistId: { type: Schema.Types.ObjectId, required: true },
    clientId: { type: String, required: true },
    client_name: { type: String, required: true },
    client_phone: { type: String, required: true },
    client_email: { type: String, match: emailRegexp, required: true },
    // date: { type: Date, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: paymentStatusList,
      default: "pending",
    },
    is_reserved: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

AppointmentSchema.post("save", handleSaveError);

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

const Appointment = model("appointment", AppointmentSchema);
export default Appointment;
