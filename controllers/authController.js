const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const generateOtp = require("../utils/otp_generator");
const sendMail = require("../utils/smtp_function");

module.exports = {
  //api/create-user
  createUser: async (req, res) => {
    const { email, username, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const minPasswordLength = 8;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ status: false, message: "Email is not valid" });
    }

    if (password.length < minPasswordLength) {
      return res.status(400).json({
        status: false,
        message: `Password should be at least ${minPasswordLength} characters long`,
      });
    }

    try {
      const emailExists = await User.findOne({ email });

      if (emailExists) {
        return res
          .status(400)
          .json({ status: false, message: "Email already exists" });
      }

      const otp = generateOtp();

      const newUser = new User({
        username,
        email,
        userType: "Client",
        password: CryptoJS.AES.encrypt(password, process.env.SECRET).toString(),
        otp,
      });

      await newUser.save();
      sendMail(newUser.email, otp);

      res
        .status(201)
        .json({ status: true, message: "User successfully created." });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  //api/login-user
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const minPasswordLength = 8;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ status: false, message: "Email is not valid" });
    }

    if (password.length < minPasswordLength) {
      return res.status(400).json({
        status: false,
        message: `Password should be at least ${minPasswordLength} characters long`,
      });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: "User not found" });
      }

      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET
      );
      const decryptedPasswordStr = decryptedPassword.toString(
        CryptoJS.enc.Utf8
      );

      if (decryptedPasswordStr !== password) {
        return res
          .status(400)
          .json({ status: false, message: "Wrong Password" });
      }

      const userToken = jwt.sign(
        { id: user._id, userType: user.userType, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "21d" }
      );

      const {
        password: _,
        createdAt,
        updatedAt,
        __v,
        otp,
        ...userData
      } = user._doc;

      res.status(200).json({ ...userData, userToken });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};
