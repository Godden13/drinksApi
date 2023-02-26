const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createUser,
  getOneUser,
  updateOneUser,
  patchOneUser,
  deleteOneUser,
} = require("../user/users");

router.route("/").get(getAllUsers).post(createUser);

router
  .route("/:id")
  .get(getOneUser)
  .put(updateOneUser)
  .patch(patchOneUser)
  .delete(deleteOneUser);

module.exports = router;
