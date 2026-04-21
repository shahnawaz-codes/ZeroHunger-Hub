const { Router } = require("express");
const {
  protect,
  requireVerified,
  restrictTo,
} = require("../../middleware/auth.middleware");
const {
  handleCreateOrder,
  handleGetMyOrders,
  handleGetOrderById,
  cancelOrderByUserHandler,
} = require("./order.controller");

const router = Router();

router.use(protect, requireVerified, restrictTo("user"));
router.post("/", handleCreateOrder);
router.get("/my", handleGetMyOrders);
router.get("/:orderId", handleGetOrderById);
router.patch("/:orderId/cancel", cancelOrderByUserHandler);

module.exports = router;
