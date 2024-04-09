const Vendor = require("../models/Vendor");

module.exports = {
  //api/addVendor
  addVendor: async (req, res) => {
    const { title, time, imageUrl, owner, code, logoUrl, coords } = req.body;
    if (
      !title ||
      !time ||
      !imageUrl ||
      !owner ||
      !code ||
      !logoUrl ||
      !coords.latitude ||
      !coords.longitude ||
      !coords.address ||
      !coords.title
    ) {
      return res
        .status(400)
        .json({ status: false, message: "You have a missing field" });
    }
    try {
      const newVendor = new Vendor(req.body);
      await newVendor.save();
      res
        .status(201)
        .json({ status: true, message: "Vendor created successfully" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  getVendorbyId: async (req, res) => {},
  getRandomVendor: async (req, res) => {},
};
