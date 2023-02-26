const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  createCategory,
  getOneCategory,
  updateOneCategory,
  deleteOneCategory,
  patchOneCategory,
} = require("../categories/categories");

router.route("/").get(getAllCategories).post(createCategory);

router
  .route("/:catId")
  .get(getOneCategory)
  .put(updateOneCategory)
  .patch(patchOneCategory)
  .delete(deleteOneCategory);

module.exports = router;
