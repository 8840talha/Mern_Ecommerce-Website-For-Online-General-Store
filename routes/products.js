const express = require("express");
const {
  Get_Single_Product,
  Add_New_Product,
  Get_All_Products,

} = require("../controllers/products");
const auth = require("../middleware/auth");
const { RoleAccess } = require("../middleware/RoleAccess");
const router = express.Router({ mergeParams: true });

router.post("/create", auth, RoleAccess("admin"), Add_New_Product);
router.get("/getAll", Get_All_Products);
router.get("/:id",Get_Single_Product)
module.exports = router;
