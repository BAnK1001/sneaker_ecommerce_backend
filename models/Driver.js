const mongoose = require("mongoose");
const Rating = require("./Rating");

const DriverSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  currentLocation: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  verification: {
    type: Boolean,
    default: false,
  },
  verificationMessage: {
    type: String,
    default: "Your account is under review",
  },
  rating: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rating",
    required: false,
  },
  totalDeliveries: {
    type: Number,
    default: 0,
  },
  profileImage: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Driver", DriverSchema);
