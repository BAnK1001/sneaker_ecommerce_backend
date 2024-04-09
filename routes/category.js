const router = require("express").Router();

const categoryController = require("../controllers/categoryController");

router.post("/create", categoryController.createCategory);

router.get("/all", categoryController.getAllCategory);

router.get("/random", categoryController.getRandomCategory);

module.exports = router;
