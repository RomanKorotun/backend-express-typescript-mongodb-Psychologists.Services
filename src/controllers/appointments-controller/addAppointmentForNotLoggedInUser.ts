import { Request, Response } from "express";
import Appointment from "../../models/Appointment.js";
import Psychologist from "../../models/Psychologist.js";
import { HttpError } from "../../helpers/index.js";
import ReservedTime from "../../models/ReservedTime.js";
import { wsServer } from "../../app.js";

const addAppointmentsForNotLoggedInUser = async (
  req: Request,
  res: Response
) => {
  const { psychologistId } = req.body;
  const psychologist = await Psychologist.findById(psychologistId);
  if (!psychologist) {
    throw HttpError(404, `psychologist with id ${psychologistId} not found`);
  }
  const appointment = await Appointment.create(req.body);

  setTimeout(async () => {
    const appointment = await Appointment.findOne({
      clientId: req.body.clientId,
    });
    if (appointment && appointment.paymentStatus === "pending") {
      appointment.paymentStatus = "failed";
      appointment.is_reserved = false;
      await appointment.save();

      const reservedTimes = await ReservedTime.findOneAndUpdate(
        { clientId: req.body.clientId },
        { isReserved: false }
      );

      if (reservedTimes) {
        wsServer.emit("newReservedTime", {
          psychologistId: reservedTimes.psychologistId,
          clientId: reservedTimes.clientId,
          date: reservedTimes.date,
          time: reservedTimes.time,
          isReserved: reservedTimes.isReserved,
        });
      }
    }
  }, 5 * 60 * 1000);

  res.status(201).json(appointment);
};

export default addAppointmentsForNotLoggedInUser;
