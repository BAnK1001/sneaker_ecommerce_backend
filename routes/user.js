const router = require("express").Router();

const userController = require("../controllers/userController");

router.get("/verify/:otp", userController.verifyAccount);
router.get("/verify_phone/:phone", userController.verifyPhone);

router.get("/", userController.getUser);

module.exports = router;
