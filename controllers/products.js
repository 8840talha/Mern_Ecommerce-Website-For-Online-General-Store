const Product = require("../models/products");

const Category = require("../models/category");

exports.Get_All_Products = (req, res) => {
  if (req.params.categoryId) {
    Product.find({ category: req.params.categoryId })
      .populate("category")
      .exec()
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
      .populate("category")
      .exec()
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
exports.Get_Single_Product = (req, res) => {
  Product.findById({ _id: req.params.id })
    .populate("category")
    .exec()
    .then((foundProduct) => {
      if (!foundProduct) {
        return res.status(404).json({
          success: true,
          message: `Not Found Product with id ${req.params.id} `,
          Product: foundProduct,
        });
      }
      res.status(200).json({
        success: true,
        message: `Found  Product with id ${req.params.id}  `,
        Product: foundProduct,
      });
    })
    .catch((err) =>
      res.status(500).json({
        error: err.name,
        message: "Object Id is Wrong or network issue",
      })
    );
};

// /api/category/categoryId/products
exports.Add_New_Product = (req, res) => {
  console.log(req.body);
  req.body.category = req.params.categoryId;
  // req.body.user = req.user.id;

  Category.findById(req.params.categoryId)
    .exec()
    .then((category) => {
      if (!category)
        return res.status(404).json({
          success: false,
          message: "No category found to add Products",
        });
      const newProduct = new Product(req.body);
      newProduct
        .save()
        .then((Product) => {
          res.status(201).json({ success: true, createdProduct: Product });
        })
        .catch((err) => {
          res.status(500).json({ success: false, error: err.message });
        });
    });
};

exports.get_Related_Products = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  console.log(req.body);
  Product.find({
    _id: { $ne: req.params.id },
    category: req.body.category,
  })
    .limit(limit)
    .populate("category", "_id name")
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
        data: foundProducts,
      });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: err.message });
    });
};
/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
 
// route - make sure its post
 
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};


// exports.list_Categories_with_products = (req, res) => {
//   Product.distinct("category", {}, (err,categories)=>{
//     if(err){
//      return res.status(500).json({ success: false, error: err.message });
//     }

//     res.status(200).json({data:categories})
//   })
   
// };
