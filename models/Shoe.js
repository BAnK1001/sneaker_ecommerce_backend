const mongoose = require("mongoose");

const ShoeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shoeTags: {
    type: Array,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,
  },
  ratingCount: {
    type: String,
    default: "267",
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Shoe", ShoeSchema);
