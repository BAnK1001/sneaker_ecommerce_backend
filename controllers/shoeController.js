const Shoe = require("../models/Shoe");

module.exports = {
  //api/addShoe
  addShoe: async (req, res) => {
    const {
      title,
      category,
      code,
      brand,
      description,
      shoeTags,
      price,
      imageUrl,
      size,
      color,
      style,
      isAvailable,
      vendor,
      rating,
      ratingCount,
    } = req.body;

    if (
      !title ||
      !category ||
      !code ||
      !brand ||
      !description ||
      !shoeTags ||
      !price ||
      !imageUrl ||
      !size ||
      !color ||
      !style ||
      !isAvailable ||
      !vendor ||
      !rating ||
      !ratingCount
    ) {
      return res
        .status(400)
        .json({ status: false, message: "You have a missing field" });
    }
    try {
      const newShoe = new Shoe(req.body);

      await newShoe.save();

      res
        .status(201)
        .json({ status: true, message: "Shoe has been successfully added" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  //api/getShoeByID
  getShoeById: async (req, res) => {
    const id = req.params.id;
    try {
      const shoe = await Shoe.findById(id);

      res.status(200).json(shoe);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  //api/getRandomShoes
  getRandomShoe: async (req, res) => {
    try {
      let randomShoeList = [];

      if (req.params.code) {
        randomShoeList = await Shoe.aggregate([
          { $match: { code: req.params.code } },
          { $sample: { size: 3 } },
          { $project: { __v: 0 } },
        ]);
      }
      if (!randomShoeList.length) {
        randomShoeList = await Shoe.aggregate([
          { $sample: { size: 5 } },
          { $project: { __v: 0 } },
        ]);
      }
      if (randomShoeList.length) {
        res.status(200).json(randomShoeList);
      } else {
        res.status(404).json({ status: false, message: "No Shoes found" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //api/getShoesByVendor
  getShoesByVendor: async (req, res) => {
    const id = req.params.id;

    try {
      const shoes = await Shoe.find({ vendor: id });

      res.status(200).json(shoes);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  //getShoesByCategoryAndCode
  getShoesByCategoryAndCode: async (req, res) => {
    const { category, code } = req.params;
    try {
      const shoes = await Shoe.aggregate([
        { $match: { category: category, code: code, isAvailable: true } },
        { $project: { __v: 0 } },
      ]);

      if (!shoes || shoes.length === 0) {
        return res.status(200).json([]);
      }

      res.status(200).json(shoes);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  //api/searchShoes
  searchShoes: async (req, res) => {
    const search = req.params.search;

    try {
      const results = await Shoe.aggregate([
        {
          $search: {
            index: "shoes",
            text: {
              query: search,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);

      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  //getRandomShoesByCategoryAndCode
  getRandomShoesByCategoryAndCode: async (req, res) => {
    const { category, code } = req.params;

    try {
      let shoes;

      shoes = await Shoe.aggregate([
        { $match: { category: category, code: code, isAvailable: true } },
        { $sample: { size: 10 } },
      ]);

      if (!shoes || shoes.length === 0) {
        shoes = await Shoe.aggregate([
          { $match: { code: code, isAvailable: true } },
          { $sample: { size: 10 } },
        ]);
      } else if (!shoes || shoes.length === 0) {
        shoes = await Shoe.aggregate([
          { $match: { isAvailable: true } },
          { $sample: { size: 10 } },
        ]);
      }
      res.status(200).json(shoes);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};
