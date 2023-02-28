const express = require("express");
const router = express.Router();

const {
  getAllDrinks,
  createDrink,
  getOneDrink,
  updateOneDrink,
  patchOneDrink,
  deleteOneDrink,
} = require("../drinks/drinks");

router.route("/").get(getAllDrinks).post(createDrink);

router
  .route("/:id")
  .get(getOneDrink)
  .put(updateOneDrink)
  .patch(patchOneDrink)
  .delete(deleteOneDrink);

module.exports = router;
