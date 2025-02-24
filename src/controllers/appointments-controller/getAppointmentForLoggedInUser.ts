import { Request, Response } from "express";
import Appointment from "../../models/Appointment.js";
import { HttpError } from "../../helpers/index.js";

const getAppointmentForLoggedInUser = async (req: Request, res: Response) => {
  const { id: _id } = req.params;
  const appointment = await Appointment.findOne(
    { _id },
    "date time meetingLink psychologistId"
  ).populate("psychologistId", "name");

  if (!appointment) {
    throw HttpError(404, "Appointment not found");
  }
  res.json(appointment);
};

export default getAppointmentForLoggedInUser;
