const express = require("express"),
  app = express(),
  dotenv = require("dotenv"),
  mongoose = require("mongoose"),
  categoryRoutes = require("./routes/category"),
  vendorRoutes = require("./routes/vendor"),
  shoeRoutes = require("./routes/shoe"),
  ratingRoutes = require("./routes/rating");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/category", categoryRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/shoe", shoeRoutes);
app.use("/api/rating", ratingRoutes);

app.listen(process.env.PORT || 6013, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
