const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const {
  getProducts,
  createProduct,
  deleteProduct,
  searchProductByName,
} = require("../controllers/productController");

// Configure Cloudinary (make sure these are set in your .env file)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tea-products",
    allowed_formats: ["jpg", "png"],
  },
});

// Multer setup to use Cloudinary storage
const upload = multer({ storage: storage });

// Get all products
router.get("/", getProducts);

// Create a new product
router.post("/", upload.single("image"), createProduct);

// Delete a product by ID
router.delete("/:id", deleteProduct);

// Search for products by name (e.g., /api/products/search?name=tea)
router.get("/search", searchProductByName);

module.exports = router;
