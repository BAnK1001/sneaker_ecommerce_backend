const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Import routes
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const vendorRoutes = require("./routes/vendor");
const shoeRoutes = require("./routes/shoe");
const ratingRoutes = require("./routes/rating");
const addressRoutes = require("./routes/address");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication middleware
app.use("/", authRoutes);

// Route middleware
app.use("/api/category", categoryRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/shoe", shoeRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Define the port number
const PORT = process.env.PORT || 6013;

// Start the server
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
