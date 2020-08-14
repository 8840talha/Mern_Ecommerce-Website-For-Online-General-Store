const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add a name"],
      maxlength: 32,
    },
    description: {
      type: String,
      required: [true, "Please Add a Description"],
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Please Add a price"],
      maxlength: 32,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
    },
    images: [
      {
        type: String,
        default: "no-phoy.jpeg",
      },
    ],
    shipping: {
      required: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
