import express from "express";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config(); // make sure to use .env for credentials

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// --- SERVE STATIC FILES ---
// This must come BEFORE any routes
app.use(express.static(path.join(process.cwd(), "Public")));

// --- ROUTES ---
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/services", (req, res) => res.render("services"));
app.get("/testimonials", (req, res) => res.render("testimonials"));
app.get("/index", (req, res) => res.render("index"));

// --- EMAIL SENDING ---
const Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-email", (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  Transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.send("Email failed to send, try again later");
    res.send("Email sent successfully");
  });
});

// --- START SERVER ---
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
