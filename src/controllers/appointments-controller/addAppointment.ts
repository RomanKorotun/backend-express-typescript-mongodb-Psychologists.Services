import { Request, Response } from "express";
import { format } from "date-fns";
import Appointment from "../../models/Appointment.js";
import Psychologist from "../../models/Psychologist.js";
import { HttpError } from "../../helpers/index.js";

const addAppointment = async (req: Request, res: Response) => {
  const { psychologistId } = req.body;
  console.log("req.body.date", req.body.date);
  const date = format(req.body.date, "yyyy-MM-dd");
  console.log(date);
  const psychologist = await Psychologist.findById(psychologistId);
  if (!psychologist) {
    throw HttpError(404, `psychologist with id ${psychologistId} not found`);
  }
  const appointment = await Appointment.create({ ...req.body, date });
  res.status(201).json(appointment);
};

export default addAppointment;
