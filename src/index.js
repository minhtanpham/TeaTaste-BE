const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRountes");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Product = require("./models/Product");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const bodyParser = require("body-parser");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the express app
const app = express();

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Optional: Enable CORS if frontend is on a different domain
app.use(cors());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tea-products", // Folder in Cloudinary
    allowed_formats: ["jpg", "png"],
    // You can also set a public_id here if needed, e.g. public_id: (req, file) => file.originalname
  },
});

// Multer setup to use Cloudinary storage
const upload = multer({ storage: storage });

// Use routes
app.use("/api", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);

// Route to upload image, save product, and return the image URL
app.use("/api/products", productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
