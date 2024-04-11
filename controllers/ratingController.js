const Rating = require("../models/Rating");
const Vendor = require("../models/Vendor");
const Shoe = require("../models/Shoe");

const updateAverageRating = async (productType, productId) => {
  const ratings = await Rating.aggregate([
    {
      $match: {
        ratingType: productType,
        product: productId,
      },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  if (ratings.length > 0) {
    const averageRating = ratings[0].averageRating;

    const updateModel = productType === "Vendor" ? Vendor : Shoe;
    await updateModel.findByIdAndUpdate(
      productId,
      { rating: averageRating },
      { new: true }
    );
  }
};

module.exports = {
  addRating: async (req, res) => {
    const newRating = new Rating({
      userId: req.user.id,
      ratingType: req.body.ratingType,
      product: req.body.product,
      rating: req.body.rating,
    });

    try {
      await newRating.save();
      await updateAverageRating(req.body.ratingType, req.body.product);

      res
        .status(200)
        .json({ status: true, message: "Rating updated successfully" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  checkUserRating: async (req, res) => {
    const { ratingType, product } = req.query;

    try {
      const existingRating = await Rating.findOne({
        userId: req.user.id,
        product,
        ratingType,
      });

      if (existingRating) {
        res
          .status(200)
          .json({ status: true, message: "You have already rated this shop" });
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
