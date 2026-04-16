const { Router } = require("express");
const {
  protect,
  requireVerified,
  restrictTo,
} = require("../../middleware/auth.middleware");
const {
  allFoodsHandler,
  createHandler,
  foodByIdHandler,
} = require("./food.controller");

const router = Router(protect, requireVerified);
// router.use(protect, requireVerified);

router.route("/").get(restrictTo("restaurant"), allFoodsHandler).post(createHandler);
router.get("/:id", foodByIdHandler);
module.exports = router;
