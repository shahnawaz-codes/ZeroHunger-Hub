const { Router } = require("express");
const {
  protect,
  requireVerified,
} = require("../../middleware/auth.middleware");
const { allFoodsHandler, foodByIdHandler } = require("./food.controller");

const router = Router();
router.use(protect, requireVerified);

// this route is for search and filter food items later on
router.route("/").get(allFoodsHandler);
router.get("/:foodId", foodByIdHandler);
module.exports = router;
