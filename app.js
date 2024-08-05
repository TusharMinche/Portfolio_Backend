import cors from 'cors';
import express, { json } from 'express';
import 'dotenv/config';
import nodemailer from 'nodemailer';

const app = express();

app.use(cors());
app.use(json());

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

app.post("/send-email", async (req, res) => {
    const { formData } = req.body;
    try {
        let mailOptions = {
            from: formData.email,
            to: "tusharminche@gmail.com",
            subject: `Portfolio: ${formData.subject}`,
            text: `Sender's Email: ${formData.email}\n\n${formData.message}`
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "Message sent successfully." });
    } catch (error) {
        console.error('Error send message:', error);
        res.status(500).json({ message: "Internal server error!" });
    }
});

app.get("/", (req, res) => {
    return res.json({
      success: true,
      message: "Your server is up and running....",
    });
  });

app.listen(5000, () => {
    console.log("http://localhost:5000");
});
