const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
require("dotenv");
console.log(process.env.EMAIL_NAME);
const sendMail = asyncHandler(async ({ email, code, subject }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_NAME || "leantu2004@gmail.com",
      pass: process.env.EMAIL_APP_PASSWORD || "oujc dnav wpgs mibu",
    },
  });

  const mailOptions = {
    from: "CuaHangDienTu@gmail.com",
    to: email,
    subject: subject,
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
      <h2 style="color: #1a0dab;">Account Authentication</h2>
      <p style="font-size: 14px;">Dear ${email},</p>
      <p style="font-size: 14px;">Please click the link below to authenticate your account:</p>
      <a href="https://example.com/authenticate" style="background-color: #4285f4; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Authenticate Account</a>
      <p style="font-size: 14px;">If you did not request this authentication, please ignore this email.</p>
      <p style="font-size: 14px;">Best regards,<br>Facebook Services</p>
      
      <div style="background-color: #f5f5f5; padding: 10px; margin-top: 20px;">
        <pre style="font-family: monospace; white-space: pre-wrap; overflow-x: auto;">your code: <strong>${code}<strong/></pre>
      </div>
    </div>
  `,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
});

module.exports = sendMail;
