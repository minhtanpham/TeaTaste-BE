const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  deleteProduct,
  searchProductByName,
} = require("../controllers/productController");

// Get all products
router.get("/products", getProducts);

// Create a new product
router.post("/products", createProduct);

// Delete a product by ID
router.delete("/products/:id", deleteProduct);

// Search for products by name (e.g., /api/products/search?name=tea)
router.get("/products/search", searchProductByName);

module.exports = router;
