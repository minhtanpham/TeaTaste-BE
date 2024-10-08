// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false, // Make name optional
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["manager", "employee", "customer"],
    default: "customer", // Default role
  },
});

// Method to match passwords (without hashing)
userSchema.methods.matchPassword = function (enteredPassword) {
  return this.password === enteredPassword; // Simple comparison
};

module.exports = mongoose.model("User", userSchema);
