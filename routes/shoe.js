const router = require("express").Router();
const shoeController = require("../controllers/shoeController");

router.post("/create", shoeController.addShoe);

router.get("/:id", shoeController.getShoeById);
router.get("/random/:code", shoeController.getRandomShoe);
router.get("/search/:search", shoeController.searchShoes);

router.get("/:category/:code", shoeController.getShoesByCategoryAndCode);

router.get("/recommendation/:code", shoeController.getRandomShoe);

router.get("/vendor-shoes/:id", shoeController.getShoesByVendor);

module.exports = router;
