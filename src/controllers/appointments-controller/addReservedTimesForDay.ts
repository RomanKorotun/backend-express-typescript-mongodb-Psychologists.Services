import { Request, Response } from "express";
import ReservedTime from "../../models/ReservedTime.js";
import { wsServer } from "../../app.js";

const addReservedTimesForDay = async (req: Request, res: Response) => {
  const { psychologistId, clientId } = req.body;

  await ReservedTime.findOneAndDelete({ psychologistId, clientId });
  const reservedTimes = await ReservedTime.create(req.body);

  wsServer.emit("newReservedTime", {
    psychologistId: reservedTimes.psychologistId,
    clientId: reservedTimes.clientId,
    date: reservedTimes.date,
    time: reservedTimes.time,
    isReserved: reservedTimes.isReserved,
  });
};

export default addReservedTimesForDay;
