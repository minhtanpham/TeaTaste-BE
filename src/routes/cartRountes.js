const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");

// POST /api/cart/products - Add product to cart
router.post("/products", authMiddleware, cartController.addProductToCart);

// GET /api/cart - Get user's cart
router.get("/", authMiddleware, cartController.getCart);

// PUT /api/cart/products - Update product quantity in cart
router.put("/products", authMiddleware, cartController.updateProductInCart);

module.exports = router;
