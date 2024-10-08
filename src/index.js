const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes"); // Import auth routes
const cartRoutes = require("./routes/cartRountes");
const cors = require("cors"); // Optional: if frontend is on a different domain

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Optional: Enable CORS if frontend is on a different domain
app.use(cors());

// Use routes
app.use("/api", productRoutes);
app.use("/api/users", userRoutes); // Use auth routes
app.use("/api/cart", cartRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Tea Shop Backend API");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
