const Product = require("../models/products");

exports.Get_All_Products = (req, res) => {
  if (req.params.categoryId) {
    Product.find({ category: req.params.categoryId })
      .exec()
      .populate("category")
      .then((foundProducts) => {
        if (foundProducts.length == 0) {
          return res.status(404).json({
            count: foundProducts.length,
            success: true,
            message: "Not Found Products",
            Products: foundProducts,
          });
        }
        res.status(200).json({
          count: foundProducts.length,
          success: true,
          message: "Found All Products",
          Products: foundProducts,
        });
      })
      .catch((err) => err.status(500).json({ error: err }));
  } else {
    Product.find()
      .exec()
      .populate("category")
      .then((allProducts) => {
        if (allProducts.length == 0) {
          return res.status(404).json({
            count: allProducts.length,
            success: true,
            message: "Not Found Products",
            Products: allProducts,
          });
        }
        res.status(200).json({
          count: allProducts.length,
          success: true,
          message: "Found All Products",
          Products: allProducts,
        });
      })
      .catch((err) => err.status(500).json({ error: err }));
  }
};
