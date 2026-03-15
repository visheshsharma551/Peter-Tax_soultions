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
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Log the request in server logs
  console.log("POST /send-email called:", req.body);

  // Verify SMTP connection (optional, but good for debugging)
  transporter.verify((err, success) => {
    if (err) console.error("SMTP verify failed:", err);
    else console.log("SMTP verified:", success);
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: "New Contact Form Message",
    text: `Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email info:", info);

    // Always return JSON
    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      info, // optional, only for debugging
    });
  } catch (error) {
    console.error("SendMail error:", error);

    // **Important:** always send JSON even on failure
    return res.status(500).json({
      success: false,
      message: "Email failed to send",
      error: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
