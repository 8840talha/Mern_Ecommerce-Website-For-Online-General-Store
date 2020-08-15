const express = require("express");
const {
  Get_Single_Product,
  Add_New_Product,
  Get_All_Products,
  get_Related_Products,
  listBySearch
  // list_Categories_with_products

} = require("../controllers/products");
const auth = require("../middleware/auth");
const { RoleAccess } = require("../middleware/RoleAccess");
const router = express.Router({ mergeParams: true });

router.post("/create",Add_New_Product);
router.get("/getAll", Get_All_Products);
router.get("/:id",Get_Single_Product)
router.get("/related/:id",get_Related_Products)
router.post("/by/search", listBySearch);

// router.get("/categories",list_Categories_with_products)

module.exports = router;
