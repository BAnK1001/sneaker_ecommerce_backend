const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Import routes
const categoryRoutes = require("./routes/category");
const vendorRoutes = require("./routes/vendor");
const shoeRoutes = require("./routes/shoe");
const ratingRoutes = require("./routes/rating");
const authRoutes = require("./routes/auth");
const addressRoutes = require("./routes/address");
const cartRoutes = require("./routes/cart");

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route middleware
app.use("/", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/shoe", shoeRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);

// Define the port number
const PORT = process.env.PORT || 6013;

// Start the server
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
