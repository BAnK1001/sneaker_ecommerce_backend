const express = require("express"),
  app = express(),
  dotenv = require("dotenv"),
  mongoose = require("mongoose"),
  categoryRoutes = require("./routes/category");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/category", categoryRoutes);

app.listen(process.env.PORT || 6013, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
