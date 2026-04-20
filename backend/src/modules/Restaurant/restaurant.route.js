const {
  protect,
  requireVerified,
  restrictTo,
} = require("../../middleware/auth.middleware");
const attachRestaurant = require("../../middleware/restaurant.middleware");
const { handleCreateRestaurant, handleMyRestaurant } = require("./restaurant.controller");

const router = require("express").Router();

router.use(protect, requireVerified, attachRestaurant);

router.post("/", handleCreateRestaurant);
router.get("/me", restrictTo("restaurant"), handleMyRestaurant);
module.exports = router;
