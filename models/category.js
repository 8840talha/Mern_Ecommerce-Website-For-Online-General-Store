const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add a name"],
      maxlength: 32,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Delete courses also when a bootcamp is deleted
// Cascade delete product when category is deleted
// here at deletemany what we are doing is taking the product model,
// finding the category to which the products belonged by doing this_id
// We re doing before delete
categorySchema.pre("remove", async function (next) {
  console.log("products removed" + this._id);
  await this.model("Product").deleteMany({ category: this._id });
  next();
});

// Adding viruals creating reverse ref and populating our parent collection with child
// Populating Categories with its products.
// Foreign field  is from products model that we
// want to pertain
// Just One is false as we want an array of products not a single product to be populated in our categories
categorySchema.virtual("ProductLists", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
  justOne: false,
});

module.exports = mongoose.model("Category", categorySchema);
