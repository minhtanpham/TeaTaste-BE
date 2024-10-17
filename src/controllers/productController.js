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
  try {
    const { name, description, price, category, story } = req.body;

    // Log request details
    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);
    console.log("req:", req);

    // Validate required fields
    if (!name || !description || !price || !category || !story || !req.file) {
      return res.status(400).json({
        message:
          "All fields are required: name, description, price, category, story, and image",
      });
    }

    // Get image URL from the uploaded file
    const imageUrl = req.file.path; // Note: Update this to get from Cloudinary after uploading

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image: imageUrl,
      story,
    });

    // Save product to the database
    await newProduct.save();

    // Respond with success message
    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Product creation failed",
      error: error.message || "An unknown error occurred",
    });
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
