require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // true для 465 порта, false для других портов
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.post("/submit-form", (req, res) => {
  const { name, phone, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: "oknehcvotil.k@gmail.com",
    subject: "new form from " + name,
    text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Отправка письма
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("sending email error:", error);
      res.status(500).send("server error");
    } else {
      console.log("Succesful email sent:", info.response);
      res.status(200).send("Succesful email sent: " + info.response);
    }
  });
});

console.log("Sending email to:", mailOptions.to);

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
