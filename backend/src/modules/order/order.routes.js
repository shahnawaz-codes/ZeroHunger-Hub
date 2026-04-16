const { Router } = require("express");
const {
  protect,
  requireVerified,
  restrictTo,
} = require("../../middleware/auth.middleware");
const { handleCreateOrder, handleGetMyOrders, handleGetOrderById, handleGetResturantOrders, handleUpdateOrderStatus } = require("./order.controller");

const router = Router();

router.use(protect, requireVerified);

router.post("/", handleCreateOrder);
router.get("/my", handleGetMyOrders);
router.get("/:id", handleGetOrderById);

/**this route is for resturant to get all orders placed to them*/
router.get("/resturant", restrictTo("restaurant"), handleGetResturantOrders);
router.put("/:id/status", restrictTo("restaurant"), handleUpdateOrderStatus);

module.exports = router;
