const Cart = require("../models/Cart");

module.exports = {
  addProductToCart: async (req, res) => {
    const userId = req.user.id;
    const { productId, totalPrice, quantity, additives } = req.body;

    try {
      let existingProduct = await Cart.findOne({ userId, productId });

      if (existingProduct) {
        existingProduct.totalPrice += totalPrice * quantity;
        existingProduct.quantity += quantity;
        await existingProduct.save();
      } else {
        const newCartItem = new Cart({
          userId,
          productId,
          totalPrice,
          quantity,
          additives,
        });
        await newCartItem.save();
      }

      const count = await Cart.countDocuments({ userId });
      res.status(existingProduct ? 200 : 201).json({ status: true, count });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  removeCartItem: async (req, res) => {
    const cartItemId = req.params.id;
    const userId = req.user.id;

    try {
      await Cart.findByIdAndDelete(cartItemId);
      const count = await Cart.countDocuments({ userId });
      res.status(200).json({ status: true, count });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  getCart: async (req, res) => {
    const userId = req.user.id;

    try {
      const cart = await Cart.find({ userId }).populate({
        path: "productId",
        select: "imageUrl title restaurant rating ratingCount",
        populate: {
          path: "restaurant",
          select: "time coords",
        },
      });

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  getCartCount: async (req, res) => {
    const userId = req.user.id;

    try {
      const count = await Cart.countDocuments({ userId });
      res.status(200).json({ status: true, count });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  decrementProductQty: async (req, res) => {
    const userId = req.user.id;
    const cartItemId = req.params.id;

    try {
      const cartItem = await Cart.findById(cartItemId);

      if (!cartItem) {
        return res
          .status(400)
          .json({ status: false, message: "Cart item not found" });
      }

      if (cartItem.quantity > 1) {
        const productPrice = cartItem.totalPrice / cartItem.quantity;
        cartItem.quantity -= 1;
        cartItem.totalPrice -= productPrice;
        await cartItem.save();
        return res.status(200).json({
          status: true,
          message: "Product quantity successfully decremented",
        });
      }

      await Cart.findByIdAndDelete(cartItemId);
      res.status(200).json({
        status: true,
        message: "Product successfully removed from cart",
      });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};
