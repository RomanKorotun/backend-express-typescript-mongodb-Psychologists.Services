import { Response } from "express";
import { ICustomerRequest } from "../../interfaces/authInterfaces";
import Appointment from "../../models/Appointment.js";

const getAppointmentsForLoggedInUser = async (
  req: ICustomerRequest,
  res: Response
) => {
  const { email: client_email } = req.user;
  const appointments = await Appointment.find(
    { client_email, paymentStatus: "completed" },
    "date time psychologistId"
  )
    .sort({ date: 1, time: 1 })
    .populate("psychologistId", "name avatar_url price_per_hour rating");
  res.json(appointments);
};

export default getAppointmentsForLoggedInUser;
