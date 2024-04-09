const express = require("express"),
  app = express(),
  dotenv = require("dotenv"),
  mongoose = require("mongoose");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    console.log("DB connection successful").catch((err) => console.log(err))
  );
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(process.env.PORT || 6013, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
