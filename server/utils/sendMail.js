const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
require("dotenv");
const sendMail = asyncHandler(async ({ email, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: "CuaHangDienTu@gmail.com",
    to: email,
    subject,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
});

module.exports = sendMail;
