import { Response } from "express";
import "dotenv/config";
import { generateSignature, HttpError } from "../../helpers/index.js";
import { ICustomerRequest } from "../../interfaces/authInterfaces.js";

const { PRIVATE_KEY_LIQPAY, PUBLIC_KEY_LIQPAY } = process.env;

const createPayment = async (req: ICustomerRequest, res: Response) => {
  const { amount, currency, description, orderId } = req.body;

  if (!PRIVATE_KEY_LIQPAY || !PUBLIC_KEY_LIQPAY) {
    throw HttpError(500, "Missing LiqPay keys in environment variables");
  }

  const expiredDate = new Date();
  expiredDate.setMinutes(expiredDate.getMinutes() + 1);
  // Отримуємо форматовану дату у вигляді YYYY-MM-DD HH:MM:SS
  const formattedDate = expiredDate
    .toISOString()
    .replace("T", " ")
    .substring(0, 19);

  const data = {
    version: 3,
    public_key: PUBLIC_KEY_LIQPAY,
    action: "pay",
    amount: Number(amount),
    currency: currency,
    description: description,
    order_id: orderId,
    server_url:
      "https://backend-express-typescript-mongodb.onrender.com/api/create-payment/callback",
    expired_date: formattedDate,
  };

  const dataString = JSON.stringify(data);
  const encodedData = Buffer.from(dataString).toString("base64");
  const signature = generateSignature(encodedData, PRIVATE_KEY_LIQPAY);

  res.json({ data: encodedData, signature });
};
export default createPayment;
