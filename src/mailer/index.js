import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
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

function sendMail({ to, subject, text }) {
  const html = `<p style="font-size: 15px; color: green; font-weight: 400;">${text}</p>`;
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
