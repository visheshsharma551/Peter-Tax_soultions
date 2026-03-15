import express from "express";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

// dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Transporter
const Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "visheshs9878@gmail.com",
    pass: "qhhg bbdt lqlg pceq",
  },
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// Serve static files
const absolutePath = path.resolve("public");
app.use(express.static(absolutePath));

// Home route
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/services", (req, res) => {
  res.render("services");
});
app.get("/testimonials", (req, res) => {
  res.render("testimonials");
});
app.get("/index", (req, res) => {
  res.render("index");
});
// POST route to send email
app.post("/send-email", (req, res) => {
  console.log(req.body);
  const mailOption = {
    from: "visheshs9878@gmail.com",
    to: "visheshs9878@gmail.com",
    subject: `New message from ${req.body.name}`, // optional
    text: `
    Name: ${req.body.name}
    Email: ${req.body.email}
    Phone: ${req.body.phone}
    Message: ${req.body.message}
  `,
  };
  Transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      res.send("email operation failed, try after some time");
    } else {
      res.send("email sent");
    }
  });
  
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
