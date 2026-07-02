const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const ContactMessage = require("../models/ContactMessage");

// ---------------------- CONTACT FORM ROUTE ----------------------
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ---------------------- SAVE TO MONGODB ----------------------
    const newMessage = new ContactMessage({ name, phone,email, message });
    await newMessage.save();

    // ---------------------- SEND EMAIL ----------------------
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
Phone: ${phone}
Email: ${email}
Message:
${message}
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent and stored successfully!" });

  } catch (error) {
    console.error("Contact Form Error:", error);
    res.status(500).json({ message: "Failed to process message" });
  }
});

module.exports = router;
