const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add product to cart
exports.addProductToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Get user ID from the authenticated user

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Find the user's cart or create a new one
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [], totalPrice: 0 }); // Set user ID
    }

    // Add product to cart or update quantity
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    // Calculate total price
    cart.totalPrice += product.price * quantity;

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Helper function to recalculate total price
const recalculateTotalPrice = async (items) => {
  let total = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    total += product.price * item.quantity;
  }
  return total;
};

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product",
      "name price"
    );
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update product quantity in cart
exports.updateProductInCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;

      // Recalculate total price
      cart.totalPrice = await recalculateTotalPrice(cart.items);

      await cart.save();
      res.json(cart);
    } else {
      return res.status(404).json({ msg: "Product not found in cart" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
