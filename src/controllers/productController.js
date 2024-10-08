// controllers/productController.js
const Product = require("../models/Product");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      description,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    await product.remove();
    res.json({ msg: "Product removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Search products by name
exports.searchProductByName = async (req, res) => {
  const { name } = req.query; // Get the search term from query params
  try {
    const products = await Product.find({ name: new RegExp(name, "i") }); // Case-insensitive search
    if (!products.length) {
      return res.status(404).json({ msg: "No products found" });
    }
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
