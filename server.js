const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Import routes
const categoryRoutes = require("./routes/category");
const vendorRoutes = require("./routes/vendor");
const shoeRoutes = require("./routes/shoe");
const ratingRoutes = require("./routes/rating");

// Import utility functions
const generateOTP = require("./utils/otp_generator");
const sendMail = require("./utils/smtp_function");

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route middleware
app.use("/api/category", categoryRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/shoe", shoeRoutes);
app.use("/api/rating", ratingRoutes);

// Define the port number
const PORT = process.env.PORT || 6013;

// Start the server
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
