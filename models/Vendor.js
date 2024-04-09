const mongoose = require("mongoose");

const VendorShema = new mongoose.Schema({
  title: { type: String, required: true },
  time: { type: String, required: true },
  imageUrl: { type: String, required: true },
  shoes: { type: Array, default: [] },
  isAvailable: { type: Boolean, default: true },
  owner: { type: String, required: true },
  code: { type: String, required: true },
  logoUrl: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 1 },
  ratingCount: { type: String, default: "0" },
  verification: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Verified", "Rejected"],
  },
  verificationMessage: {
    type: String,
    default:
      "Your shop is under review. We will notify you once it is verified.",
  },
  coords: {
    id: { type: String },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    latitudeDelta: { type: Number, default: 0.0922 },
    longitudeDelta: { type: Number, default: 0.0421 },
    address: { type: String, required: true },
    title: { type: String, required: true },
  },
});

module.exports = mongoose.model("Vendor", VendorShema);
