const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      default: "none",
    },
    password: {
      type: String,
      required: true,
    },
    // When an account is created, verification will be false. After OTP verification, it will be true.
    verification: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      default: "0123456789",
    },
    phoneVerification: {
      type: Boolean,
      default: false,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: false,
    },
    userType: {
      type: String,
      required: true,
      default: "Client",
      enum: ["Client", "Admin", "Vendor", "Driver"],
    },
    profile: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
