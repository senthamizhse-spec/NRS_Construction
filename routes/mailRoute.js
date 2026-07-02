const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// ---------------------- CONTACT FORM EMAIL ROUTE ----------------------
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `New Contact Form Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent successfully!" });

  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
});

module.exports = router;
