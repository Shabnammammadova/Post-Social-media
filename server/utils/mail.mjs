import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "mmmdovasbnm47@gmail.com",
    pass: "tvwb nfrl sjig lgns",
  },
});
