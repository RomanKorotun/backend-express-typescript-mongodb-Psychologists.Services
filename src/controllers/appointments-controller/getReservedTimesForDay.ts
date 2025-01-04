import { Request, Response } from "express";
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
  const date = new Date(dateString);
  const formattedDate = date.toISOString();

  const data = await ReservedTime.find({
    psychologistId: id,
    date: formattedDate,
  });

  const reservedTimes = timesInterval.map((item) => {
    const isReserved = data.some((elem) => elem.time === item);
    return { time: item, isReserved };
  });

  res.json({ reservedTimes });
};

export default getReservedTimesForDay;
