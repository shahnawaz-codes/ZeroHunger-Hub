const { Router } = require("express");
const {
  protect,
  requireVerified,
} = require("../../middleware/auth.middleware");
const { allFoodsHandler, foodByIdHandler } = require("./food.controller");

const router = Router();

  // Public routes - no auth required
router.route("/").get(allFoodsHandler);
router.get("/:foodId", foodByIdHandler);

// // Protected routes below (if needed)
// router.use(protect, requireVerified);
module.exports = router;
