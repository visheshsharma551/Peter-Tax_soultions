import express from "express";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
const absolutePath = path.resolve("public");
app.use(express.static(absolutePath));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

// POST route to send email

app.post("/send-email", async (req, res) => {
  console.log("POST /send-email called");

  const { name, email, phone, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Message",
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("SendMail error:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
app.get("/debug", (req, res) => {
  res.json({
    emailConfigured: !!process.env.EMAIL_USER,
    passConfigured: !!process.env.EMAIL_PASS,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
