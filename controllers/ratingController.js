const Rating = require("../models/Rating");
const Vendor = require("../models/Vendor");
const Shoe = require("../models/Shoe");

module.exports = {
  addRating: async (req, res) => {
    const newRating = new Rating({
      userId: req.user.id,
      ratingType: req.body.rating,
      product: req.body.product,
      rating: req.body.rating,
    });

    try {
      await newRating.save();

      if (req.body.ratingType === "Vendor") {
        const vendors = await Rating.aggregate([
          {
            $match: {
              ratingType: req.body.ratingType,
              product: req.body.product,
            },
          },
          { $group: { _id: "$product" }, averateRating: { $avg: "$rating" } },
        ]);

        if (vendors.length > 0) {
          const averageRating = vendors[0].averageRating;
          await Vendor.findByIdAndUpdate(
            req.body.product,
            { rating: averageRating },
            { new: true }
          );
        }
      } else if (req.body.ratingType === "Shoe") {
        const shoes = await Rating.aggregate([
          {
            $match: {
              ratingType: req.body.ratingType,
              product: req.body.product,
            },
          },
          { $group: { _id: "$product" }, averateRating: { $avg: "$rating" } },
        ]);

        if (shoes.length > 0) {
          const averageRating = shoes[0].averageRating;
          await Shoe.findByIdAndUpdate(
            req.body.product,
            { rating: averageRating },
            { new: true }
          );
        }
      }

      res
        .status(200)
        .json({ status: true, message: "Rating updated successfully" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  checkUserRating: async (req, res) => {
    const ratingType = req.query.ratingType;
    const product = req.query.product;

    try {
      const existingRating = await Rating.findOne({
        userId: req.user.id,
        product: product,
        ratingType: ratingType,
      });

      if (existingRating) {
        res
          .status(200)
          .json({ status: true, message: "You have aleady rated this shop" });
      } else {
        res
          .status(200)
          .json({ status: false, message: "User has not rated this shop" });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};
