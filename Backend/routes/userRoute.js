const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getAllUsers, getUser, removeUser, updateUser } = require("../controller/userController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/users").get(getAllUsers);
router.route("/user/:id")
  .get(getUser)
  .put(updateUser)
  .delete(removeUser);

module.exports = router;
