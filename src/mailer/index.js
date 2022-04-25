import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  pool: true,
  maxMessages: 20,
  rateDelta: 25000,
  rateLimit: 30,
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export default Object.freeze({
  sendMail,
  close,
});

function sendMail({ to, subject, text, html }) {
  var mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
}

function close() {
  transporter.close();
}
