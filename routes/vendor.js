const router = require("express").Router();

const vendorController = require("../controllers/vendorController");

router.post("/create", vendorController.addVendor);

router.get("/byId/:id", vendorController.getVendorbyId);

router.get("/:code", vendorController.getRandomVendor);

//router.get("/all/:code", vendorController.getAllNearbyVendors);

module.exports = router;
