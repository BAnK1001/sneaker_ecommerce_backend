const Vendor = require("../models/Vendor");

module.exports = {
  addVendor: async (req, res) => {
    const newVendor = new Vendor(req.body);
    try {
      const savedVendor = await newVendor.save();
      res.status(200).json(savedVendor);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getVendorbyId: async (req, res) => {},
  getRandomVendor: async (req, res) => {},
};
