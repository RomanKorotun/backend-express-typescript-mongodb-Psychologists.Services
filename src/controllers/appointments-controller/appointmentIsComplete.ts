import { Request, Response } from "express";
import Appointment from "../../models/Appointment.js";
import ReservedTime from "../../models/ReservedTime.js";

const appointmentIsComplete = async (req: Request, res: Response) => {
  const { clientId } = req.params;
  const appointment = await Appointment.findOne({
    clientId,
  });

  if (!appointment) {
    await ReservedTime.findOneAndDelete({ clientId });
  }
  res.json({ message: "Success" });
};

export default appointmentIsComplete;
