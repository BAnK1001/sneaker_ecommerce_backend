const Vendor = require("../models/Vendor");

module.exports = {
  // Add Vendor
  addVendor: async (req, res) => {
    const { title, imageUrl, owner, code, logoUrl, coords } = req.body;
    const requiredFields = [
      title,
      imageUrl,
      owner,
      code,
      logoUrl,
      coords.latitude,
      coords.longitude,
      coords.address,
      coords.title,
    ];

    if (requiredFields.some((field) => !field)) {
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

  // Get Vendor by ID
  getVendorById: async (req, res) => {
    const id = req.params.id;
    try {
      const vendor = await Vendor.findById(id);
      res.status(200).json({ status: true, data: vendor });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  //  //api/getAllVendors
  //  getAllNearbyVendors: async (req, res) => {
  //    const code = req.params.code;
  //    try {
  //      let allNearByVendors = [];
  //
  //      if (code) {
  //        allNearByVendors = Vendor.aggregate([
  //          { $match: { code: code, isAvailable: true } },
  //          { $project: { __v: 0 } },
  //        ]);
  //      }
  //
  //      if (allNearByVendors.length === 0) {
  //        allNearByVendors = Vendor.aggregate([
  //          { $match: { isAvailable: true } },
  //          { $project: { __v: 0 } },
  //        ]);
  //      }
  //
  //      res.status(200).json(allNearByVendors);
  //    } catch (error) {
  //      res.status(500).json({ status: false, message: error.message });
  //    }
  //  },
  // Get Random Vendor
  getRandomVendor: async (req, res) => {
    const code = req.params.code;
    try {
      let randomVendor = [];

      if (code) {
        randomVendor = await Vendor.aggregate([
          { $match: { code: code, isAvailable: true } },
          { $sample: { size: 4 } },
          { $project: { __v: 0 } },
        ]);
      }

      if (randomVendor.length === 0) {
        randomVendor = await Vendor.aggregate([
          { $match: { isAvailable: true } },
          { $sample: { size: 4 } },
          { $project: { __v: 0 } },
        ]);
      }

      res.status(200).json({ status: true, data: randomVendor });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  // Verify Vendor by ID
  verifyVendorById: async (req, res) => {
    const vendorId = req.params.id;
    try {
      const vendor = await Vendor.findById(vendorId);

      if (!vendor) {
        return res
          .status(404)
          .json({ status: false, message: "Vendor not found" });
      }
      vendor.verification = "Verified";
      vendor.verificationMessage =
        "Your shop has been verified by the super admin.";
      await vendor.save();
      res
        .status(200)
        .json({ status: true, message: "Vendor verified successfully" });
    } catch (error) {
      // Return an error message if an error occurs
      res.status(500).json({ status: false, message: error.message });
    }
  },
};
