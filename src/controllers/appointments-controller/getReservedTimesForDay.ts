import { Request, Response } from "express";
import { format } from "date-fns";
import ReservedTime from "../../models/ReservedTime.js";

const timesInterval = [
  "10:00 - 11:00",
  "11:00 - 12:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
];

const getReservedTimesForDay = async (req: Request, res: Response) => {
  const { id, date: dateString } = req.params;

  const date = format(dateString, "yyyy-MM-dd");

  const data = await ReservedTime.find({
    psychologistId: id,
    date,
  });

  const reservedTimes = timesInterval.map((item) => {
    const reservedTime = data.find((elem) => elem.time === item);
    if (reservedTime) {
      return {
        time: item,
        isReserved: reservedTime.isReserved,
        clientId: reservedTime.clientId,
      };
    } else {
      return { time: item, isReserved: false, clientId: null };
    }
  });

  res.json({ reservedTimes });
};

export default getReservedTimesForDay;
