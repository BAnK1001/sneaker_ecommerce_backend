const Category = require("../models/Category");

module.exports = {
  //api/createCategory
  createCategory: async (req, res) => {
    try {
      const newCategory = new Category(req.body);
      await newCategory.save();
      res
        .status(201)
        .json({ status: true, message: "Category created successfully" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  //api/getAllCategory
  getAllCategory: async (req, res) => {
    try {
      const categories = await Category.find(
        { title: { $ne: "More" } },
        { __v: 0 }
      );
      res.status(200).json({ status: true, data: categories });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  //api/getRandomCategory
  getRandomCategory: async (req, res) => {
    try {
      let categories = await Category.aggregate([
        { $match: { value: { $ne: "more" } } },
        { $sample: { size: 4 } },
      ]);
      const moreCategory = await Category.findOne(
        { value: "more" },
        { __v: 0 }
      );
      if (moreCategory) {
        categories.push(moreCategory);
      }
      res.status(200).json({ status: true, data: categories });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};
