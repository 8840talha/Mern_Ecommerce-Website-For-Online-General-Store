const Category = require("../models/category");

exports.create_New = (req, res) => {
  const newCategory = new Category(req.body);
  newCategory
    .save()
    .then((newCat) => {
      res.status(201).json({
        success: true,
        message: "Create new Category",
        data: newCat,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
        error: err,
        message: "error occured",
      })
    );
};

exports.get_All_categories = (req, res) => {
  Category.find()
    .populate("ProductLists")
    .then((foundCategories) => {
      if (foundCategories.length == 0) {
        return res.status(404).json({
          count: foundCategories.length,
          success: true,
          message: "Not Found Categories",
          Categories: foundCategories,
        });
      }
      res.status(200).json({
        count: foundCategories.length,
        success: true,
        message: "Found All Categories",
        Categories: foundCategories,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
        error: err,
        message: "error occured",
      })
    );
};
exports.get_Single_Category = (req, res, next) => {
  Category.findById(req.params.id)
    .populate("ProductLists")
    .exec()
    .then((SingleCategory) => {
      if (!SingleCategory) {
        return res.status(404).json({
          success: false,
          data: {},
          message: "Not Found Entry with this id ",
        });
      }
      res.status(200).json({
        success: true,
        data: SingleCategory,
      });
    })
    .catch(
      (err) =>
        res
          .status(400)
          .json({ error: err, success: false, message: "Wrong Object Id" })
      // next(err)
    );
};

exports.delete_Single_Category = (req, res) => {
  Category.findById(req.params.id)
    .exec()
    .then((deletedSingle) => {
      if (!deletedSingle) {
        return res.status(404).json({
          success: false,
          message: "Not Found Entry with this id  to delete",
        });
      }

      deletedSingle.remove();
      res.status(200).json({
        success: true,
        deletedData: deletedSingle,
      });
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
        success: false,
        message: "Wrong Object Id or network issue",
      })
    );
};
exports.Update_Category = (req, res) => {
  Category.findById(req.params.id)
    .exec()
    .then((updatedSingle) => {
      if (!updatedSingle) {
        return res.status(404).json({
          success: false,
          message: "Not Found Entry with this id  to update",
        });
      }
      console.log(updatedSingle);

      Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
        .exec()
        .then((updatedSingle) => {
          res.status(200).json({
            success: true,
            message: "SuccessFully Updated",
            data: updatedSingle,
          });
        });
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
        success: false,
        message: "Wrong Object Id or network issue",
      })
    );
};
