const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  ratingType: {
    type: String,
    required: true,
    enum: ["Vendor", "Driver", "Shoe"],
  },
  // If ratingType is "Vendor", product will be VendorID
  product: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
});

module.exports = mongoose.model("Rating", RatingSchema);
