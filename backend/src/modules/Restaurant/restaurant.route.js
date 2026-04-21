const {
  protect,
  requireVerified,
  restrictTo,
} = require("../../middleware/auth.middleware");
const {
  attachRestaurant,
  requireRestaurant,
} = require("../../middleware/restaurant.middleware");
const {
  handleCreateRestaurant,
  handleMyRestaurant,
} = require("./restaurant.controller");

const router = require("express").Router();

router.use(protect, requireVerified);
/**
 * base url : api/restaurants
 */
router.post("/", restrictTo("user"), handleCreateRestaurant);
router.get(
  "/me",
  restrictTo("restaurant"),
  attachRestaurant,
  requireRestaurant,
  handleMyRestaurant,
);
module.exports = router;
