const express = require("express");
const router = express.Router();
const {
  create_New,
  get_All_categories,
  get_Single_Category,
  delete_Single_Category,
  Update_Category,
} = require("../controllers/category");
const auth = require("../middleware/auth");
const { RoleAccess } = require("../middleware/RoleAccess");
//
const productRouter = require("./products");
// Re-route into other resource

router.use("/:categoryId/products",productRouter);

router.post("/create", auth, RoleAccess("admin"), create_New);
router.get("/getAll", get_All_categories);
router.get("/getSingle/:id", get_Single_Category);
router.delete("/deleteSingle/:id", delete_Single_Category);
router.put("/updateSingle/:id", Update_Category);

module.exports = router;
