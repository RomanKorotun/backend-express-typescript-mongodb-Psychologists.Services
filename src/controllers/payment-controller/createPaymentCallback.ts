import { Request, Response } from "express";
import crypto from "crypto";
import "dotenv/config";
import Appointment from "../../models/Appointment.js";
import ReservedTime from "../../models/ReservedTime.js";
import { wsServer } from "../../app.js";
import Psychologist from "../../models/Psychologist.js";
import { sendEmail } from "../../helpers/index.js";

const { BASE_URL_FRONTEND, PRIVATE_KEY_LIQPAY } = process.env;

const createPaymentCallback = async (req: Request, res: Response) => {
  const { data, signature } = req.body;
  const decodedData = Buffer.from(data, "base64").toString("utf-8");
  const parsedData = JSON.parse(decodedData);

  const calculatedSignature = crypto
    .createHash("sha1")
    .update(`${PRIVATE_KEY_LIQPAY}${data}${PRIVATE_KEY_LIQPAY}`)
    .digest("base64");
  console.log("createPaymentCallback");
  if (calculatedSignature === signature) {
    console.log("success");
    if (parsedData.status === "success") {
      const zoomMeetingLink = `https://zoom.us/j/${parsedData.order_id}`;

      const appointment = await Appointment.findOneAndUpdate(
        { clientId: parsedData.order_id },
        {
          paymentStatus: "completed",
          meetingLink: zoomMeetingLink,
        }
      );

      const psychologist = await Psychologist.findOne({
        _id: appointment?.psychologistId,
      });

      const email = {
        to: `${appointment?.client_email}`,
        subject: "Appointment at Psychologists.Services",
        html: `<div>${psychologist?.name}</div><div>${appointment?.date}</div><div>${appointment?.time}</div><a target="_blank" href=${appointment?.meetingLink}>${appointment?.meetingLink}</a>`,
      };

      await sendEmail(email);
    }

    if (parsedData.status !== "success") {
      console.log("failured");
      await Appointment.findOneAndUpdate(
        { clientId: parsedData.order_id },
        { paymentStatus: "failed", is_reserved: false }
      );

      const reservedTimes = await ReservedTime.findOneAndUpdate(
        { clientId: parsedData.order_id },
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
    res.json({ status: parsedData.status });
  }
};
export default createPaymentCallback;
