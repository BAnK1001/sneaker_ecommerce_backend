const User = require("../models/User");
const Address = require("../models/Address");

module.exports = {
  //api/addAddress
  addAddress: async (req, res) => {
    const { id: userId } = req.user;
    const {
      addressLine1,
      postalCode,
      default: isDefault,
      latitude,
      longitude,
    } = req.body;

    const newAddress = new Address({
      userId,
      addressLine1,
      postalCode,
      default: isDefault,
      latitude,
      longitude,
    });

    try {
      if (isDefault === true) {
        await Address.updateMany({ userId }, { default: false });
      }

      await newAddress.save();
      res
        .status(201)
        .json({ status: true, message: "Address successfully added" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  //api/getAddresses
  getAddresses: async (req, res) => {
    try {
      const addresses = await Address.find({ userId: req.user.id });
      res.status(200).json(addresses);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  //api/deleteAddress
  deleteAddress: async (req, res) => {
    try {
      await Address.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ status: true, message: "Address successfully deleted" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  //api/setAddressDefault
  setAddressDefault: async (req, res) => {
    const { id: addressId } = req.params;
    const { id: userId } = req.user;

    try {
      await Address.updateMany({ userId }, { default: false });

      const updatedAddress = await Address.findByIdAndUpdate(addressId, {
        default: true,
      });

      if (updatedAddress) {
        await User.findByIdAndUpdate(userId, { address: addressId });
        res.status(200).json({
          status: true,
          message: "Address successfully set as default",
        });
      } else {
        res.status(400).json({ status: false, message: "Address not found" });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  //api/getDefaultAddress
  getDefaultAddress: async (req, res) => {
    const { id: userId } = req.user;

    try {
      const address = await Address.findOne({ userId, default: true });
      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};
