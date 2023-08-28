import nodemailer from "nodemailer";
import { emailTemplete } from "./emailTemplete.js";

export default async function sendEmail(options) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <process.env.SENDER_EMAIL>',
    to: options.email,
    subject: "Hello ✔",
    text: "first",
    html: emailTemplete(options),
  });

  console.log("Message sent: %s", info);
}
