import nodemailer from "nodemailer";
import "dotenv/config";

interface IsendEmail {
  to: string;
  subject: string;
  html: string;
}

const { EMAIL_FROM, EMAIL_PASSWORD } = process.env;

const config = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_FROM,
    pass: EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = (data: IsendEmail) => {
  const email = { ...data, from: EMAIL_FROM };
  return transporter.sendMail(email);
};

export default sendEmail;
