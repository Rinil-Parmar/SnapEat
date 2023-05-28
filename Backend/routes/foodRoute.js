const express = require('express');
const router = express.Router();

const { getAllFoods, createFoodItem, getFoodByID, deleteFoodItem, updateFood } = require("../controller/foodController");

router.route("/foods").get(getAllFoods);
router.route("/food/add").post(createFoodItem);
router.route("/food/delete/:id").delete(deleteFoodItem);
router.route("/food/:id").get(getFoodByID);
router.route("/food/update/:id").put(updateFood);

module.exports = router;