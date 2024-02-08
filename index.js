require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://ralogisticks.vercel.app",//изменить потом на другой адрес
    credentials: true,
  })
);

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.post("/submit-form", (req, res) => {
  const { name, phone, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: "management@ralogistics.com.ua",
    subject: "new form from " + name,
    text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Отправка письма
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send("server error");
    } else {
      res.status(200).send("Succesful email sent: " + info.response);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
