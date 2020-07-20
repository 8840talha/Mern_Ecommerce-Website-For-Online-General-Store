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
  { timestamps: true }
);




// Delete courses also when a bootcamp is deleted
categorySchema.pre('remove', async function (next) {
    console.log('products removed' + this._id)
    await this.model('Product').deleteMany({ category: this._id })
    next()
})

// Adding viruals creating reverse ref and populating our parent collection with child
categorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category',
    justOne: false
})

module.exports = mongoose.model("Category", categorySchema);
