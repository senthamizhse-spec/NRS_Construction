const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static("public"));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api", require("./routes/userRoutes")); // if needed
app.use("/api/contact", require("./routes/contactRoute"));
app.use("/api/mail", require("./routes/mailRoute"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

// Start server
const PORT = process.env.PORT || 3050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
