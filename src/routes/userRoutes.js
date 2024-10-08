const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controllers/userController");
const { check } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  "/register",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    // Role validation is removed to make it optional
  ],
  register
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  login
);

// @route   GET /api/auth/user/:userId
// @desc    Get user by userId
// @access  Private
router.get("/:userId", getUser); // Use userId param

module.exports = router;
