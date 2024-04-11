const User = require("../models/User");

async function findUserByIdWithValidation(userId, res) {
  try {
    return await User.findById(userId);
  } catch (error) {
    handleError(res, error);
  }
}

function handleError(res, error) {
  res.status(500).json({ status: false, message: error.message });
}

module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      const { password, __v, createdAt, ...userData } = user._doc;

      res.status(200).json(userData);
    } catch (error) {
      handleError(res, error);
    }
  },

  verifyAccount: async (req, res) => {
    const userOtp = req.params.otp;

    try {
      const user = await findUserByIdWithValidation(req.user.id, res);

      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: "User not found" });
      }

      if (userOtp === user.otp) {
        user.verification = true;
        user.otp = "none";
        await user.save();

        const { password, __v, otp, createdAt, ...others } = user._doc;
        return res.status(200).json({ ...others });
      } else {
        return res
          .status(400)
          .json({ status: false, message: "OTP verification failed" });
      }
    } catch (error) {
      handleError(res, error);
    }
  },

  verifyPhone: async (req, res) => {
    const phone = req.params.phone;

    try {
      const user = await findUserByIdWithValidation(req.user.id, res);

      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: "User not found" });
      }

      user.phoneVerification = true;
      user.phone = phone;
      await user.save();

      const { password, __v, otp, createdAt, ...others } = user._doc;
      return res.status(200).json({ ...others });
    } catch (error) {
      handleError(res, error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user.id);
      res
        .status(200)
        .json({ status: true, message: "User deleted successfully" });
    } catch (error) {
      handleError(res, error);
    }
  },
};
