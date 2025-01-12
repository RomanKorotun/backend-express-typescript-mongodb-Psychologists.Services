import { Response } from "express";
import Appointment from "../../models/Appointment.js";
import Psychologist from "../../models/Psychologist.js";
import { HttpError } from "../../helpers/index.js";
import { ICustomerRequest } from "../../interfaces/authInterfaces.js";

const addAppointmentsForLoggedInUser = async (
  req: ICustomerRequest,
  res: Response
) => {
  const { psychologistId } = req.body;
  const { username, email } = req.user;
  const psychologist = await Psychologist.findById(psychologistId);
  if (!psychologist) {
    throw HttpError(404, `psychologist with id ${psychologistId} not found`);
  }
  const appointment = await Appointment.create({
    ...req.body,
    client_name: username,
    client_email: email,
  });
  res.status(201).json(appointment);
};

export default addAppointmentsForLoggedInUser;
