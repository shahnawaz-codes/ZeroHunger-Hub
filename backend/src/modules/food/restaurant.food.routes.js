const { Router } = require("express");
const {
  protect,
  requireVerified,
  restrictTo,
} = require("../../middleware/auth.middleware");
const { MyfoodsHandler, createHandler } = require("./food.controller");
const {
  attachRestaurant,
  requireRestaurant,
} = require("../../middleware/restaurant.middleware");

const router = Router();
/**
 * these middlewares are used to protect the routes from unauthorized access and customers and attach the restaurant to the request
 */
router.use(
  protect,
  requireVerified,
  restrictTo("restaurant"),
  attachRestaurant,
  requireRestaurant, // check if the user is a restaurant
);

router.route("/").post(createHandler).get(MyfoodsHandler);
module.exports = router;
