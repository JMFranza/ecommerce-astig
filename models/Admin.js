const mongoose = require("mongoose");

import { isEmail } from "validator";
const AdminSchema = new mongoose.Schema({
  profile_picture: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please add email"],
    unique: [true, "Email already available"],
    validate: [isEmail, "invalid email"],
  },
  username: {
    type: String,
    required: [true, "Please add username"],
    unique: [true, "Username already available"],
  },
  password: {
    type: String,
    required: true,
    min: [6, "Password too short"],
  },
  login_count: {
    type: Number,
    default: 0,
  },
  full_name: {
    type: String,
    required: [true, "Please add Fullname"],
  },
  city: {
    type: String,
    required: [true, "City cannot be empty"],
  },
  postal_code: {
    type: String,
    required: [true, "Postal code cannot be empty"],
  },
  country: {
    type: String,
    required: [true, "Country code cannot be empty"],
  },
  email_token: {
    type: String,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  admin_token: {
    type: String,
  },
  admin_verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
