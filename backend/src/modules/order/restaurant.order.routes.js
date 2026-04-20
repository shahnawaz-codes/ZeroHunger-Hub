const { Router } = require("express");
const {
  protect,
  requireVerified,
  restrictTo,
} = require("../../middleware/auth.middleware");
const {
  updateOrderStatusHandler,
  handleGetRestaurantOrders,
} = require("./order.controller");
const attachRestaurant = require("../../middleware/restaurant.middleware");

const router = Router();

router.use(
  protect,
  requireVerified,
  restrictTo("restaurant"),
  attachRestaurant,
);

router.get("/", handleGetRestaurantOrders);
router.patch("/:orderId/cancel", updateOrderStatusHandler("cancelled"));
router.patch("/:orderId/confirm", updateOrderStatusHandler("confirmed"));
router.patch("/:orderId/ready", updateOrderStatusHandler("ready_for_pickup"));
router.patch("/:orderId/complete", updateOrderStatusHandler("completed"));
module.exports = router;
